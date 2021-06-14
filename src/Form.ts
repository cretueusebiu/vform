import { serialize } from 'object-to-formdata'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import Errors from './Errors'
import { deepCopy, hasFiles } from './util'

interface Progress {
  total: number
  loaded: number
  percentage: number
}

class Form {
  [key: string]: any
  originalData: Record<string, any> = {}

  /**
   * Indicates if the form is sent to the server.
   */
  busy: boolean = false

  recentlySuccessfulTimeoutId: number | undefined = undefined;

  /**
   * When a form has been successfully submitted, the successful property will be true.
   * In addition to this, there is also a recentlySuccessful property,
   * which will be set to true for two seconds after a successful form submission.
   * This is helpful for showing temporary success messages.
   */
  recentlySuccessful: boolean = false;

  /**
   * Indicates if the response form the server was successful.
   */
  successful: boolean = false

  /**
   * The validation errors from the server.
   */
  errors: Errors = new Errors()

  /**
   * The upload progress object.
   */
  progress: Progress | undefined = undefined

  static axios: AxiosInstance
  static routes: Record<string, string> = {}
  static errorMessage = 'Something went wrong. Please try again.'
  static ignore = ['busy', 'successful', 'errors', 'progress', 'originalData', 'recentlySuccessfulTimeoutId', 'recentlySuccessful']

  /**
   * Create a new form instance.
   */
  constructor (data: Record<string, any> = {}) {
    this.update(data)
  }

  /**
   * Create a new form instance.
   */
  static make<T extends typeof Form, U> (this: T, augment?: U) {
    return new this(augment) as InstanceType<T> & U
  }

  /**
   * Update the form data.
   */
  update (data: Record<string, any>) {
    this.originalData = Object.assign({}, this.originalData, deepCopy(data))

    Object.assign(this, data)
  }

  /**
   * Fill the form data.
   */
  fill (data: Record<string, any> = {}) {
    this.keys().forEach((key) => {
      (this as any)[key] = data[key]
    })
  }

  /**
   * Get the form data.
   */
  data (): Record<string, any> {
    return this.keys().reduce((data, key) => (
      { ...data, [key]: (this as any)[key] }
    ), {})
  }

  /**
   * Get the form data keys.
   */
  keys (): string[] {
    return Object.keys(this).filter(key => !Form.ignore.includes(key))
  }

  /**
   * Start processing the form.
   */
  startProcessing () {
    this.errors.clear()
    this.busy = true
    this.successful = false
    this.progress = undefined
    this.recentlySuccessful = false
    clearTimeout(this.recentlySuccessfulTimeoutId)
  }

  /**
   * Finish processing the form.
   */
  finishProcessing () {
    this.busy = false
    this.successful = true
    this.progress = undefined
    this.recentlySuccessful = true
    this.recentlySuccessfulTimeoutId = setTimeout(() => this.recentlySuccessful = false, 2000)
  }

  /**
   * Clear the form errors.
   */
  clear () {
    this.errors.clear()
    this.successful = false
    this.progress = undefined
  }

  /**
   * Reset the form data.
   */
  reset () {
    Object.keys(this)
      .filter(key => !Form.ignore.includes(key))
      .forEach((key) => {
        (this as any)[key] = deepCopy(this.originalData[key])
      })
  }

  /**
   * Submit the form via a GET request.
   */
  get (url: string, config: AxiosRequestConfig = {}) {
    return this.submit('get', url, config)
  }

  /**
   * Submit the form via a POST request.
   */
  post (url: string, config: AxiosRequestConfig = {}) {
    return this.submit('post', url, config)
  }

  /**
   * Submit the form via a PATCH request.
   */
  patch (url: string, config: AxiosRequestConfig = {}) {
    return this.submit('patch', url, config)
  }

  /**
   * Submit the form via a PUT request.
   */
  put (url: string, config: AxiosRequestConfig = {}) {
    return this.submit('put', url, config)
  }

  /**
   * Submit the form via a DELETE request.
   */
  delete (url: string, config: AxiosRequestConfig = {}) {
    return this.submit('delete', url, config)
  }

  /**
   * Submit the form data via an HTTP request.
   */
  submit (method: string, url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
    this.startProcessing()

    config = {
      data: {},
      params: {},
      url: this.route(url),
      method: method as any,
      onUploadProgress: this.handleUploadProgress.bind(this),
      ...config
    }

    if (method.toLowerCase() === 'get') {
      config.params = { ...this.data(), ...config.params }
    } else {
      config.data = { ...this.data(), ...config.data }

      if (hasFiles(config.data)) {
        config.transformRequest = [data => serialize(data)]
      }
    }

    return new Promise((resolve, reject) => {
      (Form.axios || axios).request(config)
        .then((response: AxiosResponse) => {
          this.finishProcessing()
          resolve(response)
        })
        .catch((error: AxiosError) => {
          this.handleErrors(error)
          reject(error)
        })
    })
  }

  /**
   * Handle the errors.
   */
  handleErrors (error: AxiosError) {
    this.busy = false
    this.progress = undefined

    if (error.response) {
      this.errors.set(this.extractErrors(error.response))
    }
  }

  /**
   * Extract the errors from the response object.
   */
  extractErrors (response: AxiosResponse): Record<string, any> {
    if (!response.data || typeof response.data !== 'object') {
      return { error: Form.errorMessage }
    }

    if (response.data.errors) {
      return { ...response.data.errors }
    }

    if (response.data.message) {
      return { error: response.data.message }
    }

    return { ...response.data }
  }

  /**
   * Handle the upload progress.
   */
  handleUploadProgress (event: ProgressEvent) {
    this.progress = {
      total: event.total,
      loaded: event.loaded,
      percentage: Math.round((event.loaded * 100) / event.total)
    }
  }

  /**
   * @deprecated
   */
  route (name: string, parameters: any = {}) {
    let url = name

    if (Object.prototype.hasOwnProperty.call(Form.routes, name)) {
      url = decodeURI(Form.routes[name])
    }

    if (typeof parameters !== 'object') {
      parameters = { id: parameters }
    }

    Object.keys(parameters).forEach((key) => {
      url = url.replace(`{${key}}`, parameters[key])
    })

    return url
  }

  /**
   * Clear errors on keydown.
   */
  onKeydown (event: KeyboardEvent) {
    const target = event.target as HTMLInputElement

    if (target.name) {
      this.errors.clear(target.name)
    }
  }
}

export default Form

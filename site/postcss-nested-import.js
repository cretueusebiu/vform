// https://github.com/eriklharper/postcss-nested-import
const fs = require('fs')
const postcss = require('postcss')

function parseImportPath (path) {
  const matches = path.trim().match(/^['"](.+?)['"](.*)/)
  // const modes = matches[2].trim().split(' ');
  const fragment = matches[1]
  return fragment
}

function readFile (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, contents) => {
      if (err) {
        return reject(err)
      }
      return resolve(contents)
    })
  })
}

module.exports = () => {
  return {
    postcssPlugin: 'postcss-nested-import',
    Once (root) {
      return new Promise((resolve) => {
        let prom = Promise.resolve()
        root.walkAtRules('nested-import', (importAtRule) => {
          if (importAtRule.params) {
            const path = parseImportPath(importAtRule.params)
            if (path === null) {
              return
            }
            prom = prom.then(() => readFile(path).then(fileContents =>
              importAtRule.replaceWith(fileContents)
            ))
          }
        })
        resolve(prom)
      })
    }
  }
}

module.exports.postcss = true

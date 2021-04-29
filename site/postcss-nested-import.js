// https://github.com/eriklharper/postcss-nested-import
const { readFileSync } = require('fs')

function parseImportPath (path) {
  const matches = path.trim().match(/^['"](.+?)['"](.*)/)
  return matches ? matches[1] : null
}

function readFile (path) {
  try {
    return readFileSync(path, { encoding: 'utf-8' })
  } catch (e) {
    try {
      return readFileSync(`node_modules/${path}`, { encoding: 'utf-8' })
    } catch (e) {}

    throw e
  }
}

module.exports = () => {
  return {
    postcssPlugin: 'postcss-nested-import',
    Once (root) {
      root.walkAtRules('nested-import', (rule) => {
        if (!rule.params) {
          return
        }

        const path = parseImportPath(rule.params)
        if (!path) {
          return
        }

        rule.replaceWith(readFile(path))
      })
    }
  }
}

module.exports.postcss = true

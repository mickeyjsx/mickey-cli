/* eslint-disable no-console */

import path from 'path'
import chalk from 'chalk'
import async from 'async'
import multimatch from 'multimatch'
import Metalsmith from 'metalsmith'
import Handlebars from 'handlebars'
import { handlebars } from 'consolidate'
import { isFunction } from '../utils'
import logger from '../logger'
import ask from './ask'
import filter from './filter'
import getOptions from './getOptions'

const { render } = handlebars

Handlebars.registerHelper('if_eq', (a, b, opts) => (a === b
  ? opts.fn(this)
  : opts.inverse(this)),
)

Handlebars.registerHelper('unless_eq', (a, b, opts) => (a === b
  ? opts.inverse(this)
  : opts.fn(this)),
)

// middleware for asking questions
const askQuestions = prompts => (files, metalsmith, done) => {
  ask(prompts, metalsmith.metadata(), done)
}

// middleware for filtering files
const filterFiles = filters => (files, metalsmith, done) => {
  filter(files, filters, metalsmith.metadata(), done)
}

function logMessage(message, data) {
  if (!message) {
    return
  }

  render(message, data, (err, res) => {
    if (err) {
      console.error(`\n   Error when rendering template complete message: ${err.message.trim()}`)
    } else {
      console.log(`\n${res.split(/\r?\n/g).map(line => `   ${line}`).join('\n')}`)
    }
  })
}

function renderTemplateFiles(skipInterpolation) {
  skipInterpolation = typeof skipInterpolation === 'string' // eslint-disable-line
    ? [skipInterpolation]
    : skipInterpolation

  return (files, metalsmith, done) => {
    const keys = Object.keys(files)
    const metalsmithMetadata = metalsmith.metadata()

    async.each(keys, (file, next) => {
      // skipping files with skipInterpolation option
      if (skipInterpolation && multimatch([file], skipInterpolation, { dot: true }).length) {
        return next()
      }

      const str = files[file].contents.toString()
      // do not attempt to render files that do not have mustaches
      if (!/{{([^{}]+)}}/g.test(str)) {
        return next()
      }

      return render(str, metalsmithMetadata, (err, res) => {
        if (err) {
          err.message = `[${file}] ${err.message}`
          return next(err)
        }
        files[file].contents = new Buffer(res)
        return next()
      })
    }, done)
  }
}

export default function generate(name, src, dest, done) {
  const opts = getOptions(name, src)
  const metalsmith = Metalsmith(path.join(src, 'template'))
  const data = {
    ...metalsmith.metadata(),
    destDirName: name,
    inPlace: dest === process.cwd(),
    noEscape: true,
  }

  const {
    helpers,
    metalsmith: metalsmithOpts = {},
    prompts,
    filters,
    skipInterpolation,
    complete,
    completeMessage,
  } = opts

  if (helpers) {
    Object.keys(helpers).forEach((key) => {
      Handlebars.registerHelper(key, helpers[key])
    })
  }

  const {
    before: beforeGenerate,
    after: afterGenerate,
  } = metalsmithOpts
  const utils = { chalk, logger }

  if (isFunction(beforeGenerate)) {
    beforeGenerate(metalsmith, opts, utils)
  }

  metalsmith
    .use(askQuestions(prompts))
    .use(filterFiles(filters))
    .use(renderTemplateFiles(skipInterpolation))

  if (isFunction(metalsmithOpts)) {
    metalsmithOpts(metalsmith, opts, utils)
  } else if (isFunction(afterGenerate)) {
    afterGenerate(metalsmith, opts, utils)
  }

  metalsmith
    .clean(false)
    .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
    .destination(dest)
    .build((err, files) => {
      done(err)
      if (isFunction(complete)) {
        complete(data, { chalk, logger, files })
      } else {
        logMessage(completeMessage, data)
      }
    })

  return data
}

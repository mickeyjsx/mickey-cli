import path from 'path'
import { existsSync as exists } from 'fs'
import metadata from 'read-metadata'
import validateName from 'validate-npm-package-name'
import getGitUser from './getGitUser'


// Gets the metadata from either a metadata.json or metadata.js file.
function getMetadata(dir) {
  const json = path.join(dir, 'metadata.json')
  const js = path.join(dir, 'metadata.js')
  let opts = {}

  if (exists(json)) {
    opts = metadata.sync(json)
  } else if (exists(js)) {
    const req = require(path.resolve(js)) // eslint-disable-line
    if (req !== Object(req)) {
      throw new Error('metadata.js needs to expose an object')
    }
    opts = req
  }

  return opts
}

// Set the default value for a prompt question.
function setDefault(opts, key, val) {
  if (!opts.prompts) {
    opts.prompts = {}
  }

  const prompts = opts.prompts
  if (!prompts[key] || typeof prompts[key] !== 'object') {
    prompts[key] = {
      type: 'string',
      default: val,
    }
  } else {
    prompts[key].default = val
  }
}

function setValidateName(opts) {
  const name = opts.prompts.name
  const customValidate = name.validate
  name.validate = (_name) => {
    const its = validateName(_name)
    if (!its.validForNewPackages) {
      const errors = (its.errors || []).concat(its.warnings || [])
      return `Sorry, ${errors.join(' and ')}.`
    }

    if (typeof customValidate === 'function') {
      return customValidate(_name)
    }

    return true
  }
}

export default function getOptions(name, dir) {
  const opts = getMetadata(dir)

  setDefault(opts, 'name', name)
  setValidateName(opts)

  const author = getGitUser()
  if (author) {
    setDefault(opts, 'author', author)
  }

  return opts
}

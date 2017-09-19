import async from 'async'
import inquirer from 'inquirer'
import evaluate from './eval'

// Support types from prompt-for which was used before
const promptMapping = {
  string: 'input',
  boolean: 'confirm',
}

function prompt(data, key, item, done) {
  // skip prompts whose when condition is not met
  if (item.when && !evaluate(item.when, data)) {
    return done()
  }

  let promptDefault = item.default
  if (typeof promptDefault === 'function') {
    promptDefault = () => item.default.bind(this)(data)
  }

  return inquirer.prompt([{
    type: promptMapping[item.type] || item.type,
    name: key,
    message: item.message || item.label || key,
    default: promptDefault,
    choices: item.choices || [],
    validate: item.validate || (() => true),
  }]).then((answers) => {
    if (Array.isArray(answers[key])) {
      data[key] = {}
      answers[key].forEach((multiChoiceAnswer) => {
        data[key][multiChoiceAnswer] = true
      })
    } else if (typeof answers[key] === 'string') {
      data[key] = answers[key].replace(/"/g, '\\"')
    } else {
      data[key] = answers[key]
    }
    done()
  })
}

export default function ask(prompts, data, done) {
  async.eachSeries(Object.keys(prompts), (key, next) => {
    prompt(data, key, prompts[key], next)
  }, done)
}

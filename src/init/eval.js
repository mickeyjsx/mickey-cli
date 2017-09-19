import chalk from 'chalk'

// Evaluate an expression in metadata.json in the context of prompt answers data.
export default function evaluate(exp, data) {
  const fn = new Function('data', `with (data) { return ${exp}}`) // eslint-disable-line
  try {
    return fn(data)
  } catch (e) {
    console.error(chalk.red(`Error when evaluating filter condition: ${exp}`)) // eslint-disable-line
  }

  return null
}

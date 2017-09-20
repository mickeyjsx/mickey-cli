/* eslint-disable no-console */
import chalk from 'chalk'
import updateNotifier from 'update-notifier'
import pkg from '../package.json'

const notifier = updateNotifier({ pkg })
const update = notifier.update
// || {
//   latest: '1.0.1',
//   current: '1.0.0',
// }

if (update) {
  const latest = update.latest
  const current = update.current

  console.log()
  console.log(chalk.gray('     ----------------------------------------------'))
  console.log(`    ${chalk.gray('/')}        update available ${chalk.gray(current)} → ${chalk.green(latest)}        ${chalk.gray('\\')}`)
  console.log(`    ${chalk.gray('\\')}   run ${chalk.cyan('(sudo) npm i -g mickey-cli')} to update   ${chalk.gray('/')}`)
  console.log(chalk.gray('     ----------------------------------------------'))
  console.log()
}

import { execSync as exec } from 'child_process'

export default function getGitUser() {
  let name
  let email

  try {
    name = exec('git config --get user.name')
    email = exec('git config --get user.email')
  } catch (e) { } // eslint-disable-line

  name = name && JSON.stringify(name.toString().trim()).slice(1, -1)
  email = email ? email.toString().trim() : ''
  const user = {
    name,
    email,
  }

  user.toString = () => `${user.name}${user.email ? `<${user.email}>` : ''}`

  return user
}

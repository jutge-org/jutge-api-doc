/**
 * This is a tutorial script that shows how to use the Jutge API client in TypeScript.
 *
 * In order to run this script you need to have the Jutge API client and its extras installed.
 * You can download them these links:
 *    - Jutge API client: https://api.jutge.org/api/clients/typescript
 *    - Jutge API client extras: https://api.jutge.org/api/extras/typescript
 *
 * Full reference documentation is available at https://api.jutge.org
 */

// Import the Jutge API client and its extras
import { JutgeApiClient } from './jutge_api_client'
import { login, logout } from './jutge_api_client_extras'

// Make a client
const j = new JutgeApiClient()

// Get a fortune cookie
console.log(await j.misc.getFortune())

// Get the current time in the server and print one of its attributes
const time = await j.misc.getTime()
console.log(time.full_time)
console.log()

// Get the homepage stats and print them
const stats = await j.misc.getHomepageStats()
console.log(`users: ${stats.users}, problems: ${stats.problems}, submissions: ${stats.submissions}`)
console.log()

// Get all compilers
const compilers = await j.tables.getCompilers()
// Filter C++ compilers amd print their name
for (const [compiler_id, compiler] of Object.entries(compilers)) {
    if (compiler.language === 'C++') {
        console.log(compiler.name)
    }
}
console.log()

// Get P68688 (Hello, world!) problem and print its title and author.
const problem = await j.problems.getProblem('P68688_en')
console.log(problem.title)
console.log(problem.abstract_problem.author)

// TODO: update this doc
// All previous functions where public, but in order to access
// other functions, we need to login. Login credentials are stored
// in a file ~/.jutge-client.yml. If the file does not exist, the
// user is asked for the credentials and may choose to save them.
// Be aware that the credentials are stored in plain text.
await login(j)
console.log()

// Get user's name an uid in the profile.
const profile = await j.student.profile.get()
console.log(profile.name)
console.log(profile.user_uid)
console.log()

// TODO: update the profile

// All authenticated users are students and can use the student module.
// There are other modules for different roles, such as admin, instructor, etc.

// Get all problem statuses, filter those that are accepeted and print the first 8 in alphabetical order.
const statuses = await j.student.statuses.getAll()
const accepteds = []
for (const [problem_nm, status] of Object.entries(statuses)) {
    if (status.status == 'accepted') {
        accepteds.push(problem_nm)
    }
}
console.log(accepteds.sort().slice(0, 7))
console.log()

// Get the status of P68688
const status = await j.student.statuses.getForAbstractProblem('P68688')
console.log(status)
console.log()

// Logging out is not necessary, but it is advisable.
await logout(j)
console.log()

// See the full doc at https://api.jutge.org

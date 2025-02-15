import { JutgeApiClient } from "./jutge_api_client"
import { login } from "./jutge_api_client_extras"

const jutge = new JutgeApiClient()

await login(jutge)

// Get all problem statuses, filter those that are accepeted
// and print the first 8 in alphabetical order.
const result = 
    Object.entries(await jutge.student.statuses.getAll())
        .filter(([_, { status }]) => status === "accepted")
        .map(([problem_nm]) => problem_nm)
        .sort()
        .slice(0, 7)

console.log(result)

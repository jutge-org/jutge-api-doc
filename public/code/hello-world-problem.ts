// Import the Jutge API client and its extras
import { JutgeApiClient } from "./jutge_api_client"

// Make a client
const jutge = new JutgeApiClient()

// Get P68688 (Hello, world!) problem and print its title and author.
const problem = await jutge.problems.getProblem("P68688_en")
console.log(problem.title)
console.log(problem.abstract_problem.author)

const statement = await jutge.problems.getTextStatement("P68688_en")
console.log(statement)

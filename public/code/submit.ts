import { sleep } from "bun" // This script needs Bun just for 'sleep'
import { readFile } from "fs/promises"
import { JutgeApiClient } from "./jutge_api_client"

// Create a Jutge API client
const jutge = new JutgeApiClient()

// Login getting credentials from the environment
await jutge.login({
    email: process.env.JUTGE_EMAIL!,
    password: process.env.JUTGE_PASSWORD!,
})

// Read the submission file
const problem_id = "P68688_ca"
const filename = "P68688.cc"
const code = await readFile(filename)
const file = new File([code], filename, { type: "text/x-c" })

// Submit!
const nowDate = new Date().toLocaleDateString()
const nowTime = new Date().toLocaleTimeString()
const problem_info = {
    compiler_id: "P1++",
    problem_id,
    annotation: `Sent through the API on ${nowDate} at ${nowTime}`,
}
const { submission_id } = await jutge.student.submissions.submit(problem_info, file)

// Wait for verdict
let veredict: string | null = null
while (veredict === null) {
    sleep(1000)
    const state = await jutge.student.submissions.get({ problem_id, submission_id })
    if (state.state === "done") {
        veredict = state.veredict
    }
}

// Show it!
console.log("Veredict", veredict)

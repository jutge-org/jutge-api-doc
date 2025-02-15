// Import the Jutge API client and its extras
import { JutgeApiClient } from './jutge_api_client'

// Make a client
const jutge = new JutgeApiClient()

// Get all compilers
const compilers = await jutge.tables.getCompilers()

// Filter C++ compilers amd print their name
for (const [id, compiler] of Object.entries(compilers)) {
    console.log(`${id}: ${compiler.name} (${compiler.language})`)
}

import { JutgeApiClient } from './jutge_api_client'

// Create a Jutge API client
const jutge = new JutgeApiClient()

// Get the server time
const time = await jutge.misc.getTime()
console.log(time.full_time)

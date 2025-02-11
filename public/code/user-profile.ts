import { JutgeApiClient } from './jutge_api_client'
import { login } from './jutge_api_client_extras'

const jutge = new JutgeApiClient()

await login(jutge)

// Get user's name an uid in the profile.
const profile = await jutge.student.profile.get()
console.log(profile.name)
console.log(profile.user_uid)

import { JutgeApiClient } from './jutge_api_client'

const jutge = new JutgeApiClient()

await jutge.login({ 
    email: "<your email>", 
    password: "<your password>"
})

// Get user's name an uid in the profile.
const profile = await jutge.student.profile.get()
console.log(profile.name)
console.log(profile.user_uid)

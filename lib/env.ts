import { boolean, literal, string, union } from 'valibot'
import { createEnv } from 'valibot-env'

const env = createEnv({
    schema: {
        shared: {
            JUTGE_API_URL: string(),
            NODE_ENV: union([literal('development'), literal('production'), literal('test')]),
            TESTING: boolean(), // this is computed from NODE_ENV
        },
    },
    values: {
        ...process.env,
        NODE_ENV: process.env.NODE_ENV || 'development',
        TESTING: process.env.NODE_ENV === 'test',
    },
})

export default env

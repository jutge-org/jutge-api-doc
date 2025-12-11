import { boolean, literal, string, union, optional } from 'valibot'
import { createEnv } from 'valibot-env'

const env = createEnv({
    schema: {
        shared: {
            JUTGE_API_CLIENTS_DIR: string(),
            JUTGE_API_URL: optional(string()),
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

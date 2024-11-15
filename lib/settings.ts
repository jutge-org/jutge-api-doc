import chalk from 'chalk'
import fs from 'fs'
import { basename } from 'path'
import YAML from 'yaml'

const path = process.env.JUTGE_DOC_CONFIG || `${process.env.HOME}/.jutge.yml`
const filename = basename(__filename)
console.log(
    chalk.green(`${filename}: using settings from ${path} (use JUTGE_DOC_CONFIG to override)`),
)

const settings = YAML.parse(fs.readFileSync(path, 'utf8'))

export default settings

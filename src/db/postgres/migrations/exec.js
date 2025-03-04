import 'dotenv/config.js'
import fs from 'fs'
import { pool } from '../helper.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const execMigrations = async () => {
    const client = await pool.connect()
    try {
        const files = fs
            .readdirSync(__dirname)
            .filter((file) => file.endsWith('.sql'))

        for (const file of files) {
            const filePath = path.join(__dirname, file)
            const script = fs.readFileSync(filePath, 'utf-8')

            await client.query(script)

            console.log(`Migration ${file} executada com sucesso!`)
        }

        console.log('Todas as Migrations executada com sucesso!')
    } catch (error) {
        console.error('Deu erro ao fazer a migration', error)
    } finally {
        await client.release()
    }
}

execMigrations()

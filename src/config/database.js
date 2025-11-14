import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import config from './config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Use DATABASE_URL from config
let dbPath

if (path.isAbsolute(config.databaseUrl)) {
	// Absolute path (production with volume mount)
	dbPath = config.databaseUrl
} else {
	// Relative path (development)
	dbPath = path.join(__dirname, '../../', config.databaseUrl)
}

console.log(`📊 Database path: ${dbPath}`)

// Create/connect to database
const db = new Database(dbPath)

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Initialize database tables
export const initializeDatabase = async () => {
	console.log('🔧 Initializing database...')
	
	// Import models
	const Song = (await import('../models/Song.js')).default
	
	// Create tables
	Song.createTable()
	
	// Seed in all environments (or just production/dev as you like)
	Song.seed()
	
	console.log('✅ Database initialization complete')
}

	
	console.log('✅ Database initialization complete')


export default db
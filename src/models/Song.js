import db from '../config/database.js'

// Define the Song model
class Song {
	// Table schema definition
	static tableName = 'songs'
	
	// Create the songs table
	static createTable() {
		const sql = `
			CREATE TABLE IF NOT EXISTS ${this.tableName} (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				title TEXT NOT NULL,
				artist TEXT NOT NULL,
				album TEXT,
				year INTEGER,
				duration TEXT,
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
			)
		`
		db.exec(sql)
		console.log(`✅ Table '${this.tableName}' created/verified`)
	}
	
	// Get all songs
	static findAll() {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} ORDER BY year DESC, id`)
		return stmt.all()
	}
	
	// Find song by ID
	static findById(id) {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
		return stmt.get(id)
	}
	
	// Find songs by artist
	static findByArtist(artist) {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE artist LIKE ? ORDER BY year DESC`)
		return stmt.all(`%${artist}%`)
	}
	
	// Find songs by album
	static findByAlbum(album) {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE album LIKE ? ORDER BY id`)
		return stmt.all(`%${album}%`)
	}
	
	// Create new song
	static create(songData) {
		const { title, artist, album, year, duration } = songData
		const stmt = db.prepare(`
			INSERT INTO ${this.tableName} (title, artist, album, year, duration) 
			VALUES (?, ?, ?, ?, ?)
		`)
		const result = stmt.run(title, artist, album || null, year || null, duration || null)
		return this.findById(result.lastInsertRowid)
	}
	
	// Update song
	static update(id, songData) {
		const { title, artist, album, year, duration } = songData
		
		// Build dynamic update query based on provided fields
		const updates = []
		const values = []
		
		if (title !== undefined) {
			updates.push('title = ?')
			values.push(title)
		}
		
		if (artist !== undefined) {
			updates.push('artist = ?')
			values.push(artist)
		}
		
		if (album !== undefined) {
			updates.push('album = ?')
			values.push(album)
		}
		
		if (year !== undefined) {
			updates.push('year = ?')
			values.push(year)
		}
		
		if (duration !== undefined) {
			updates.push('duration = ?')
			values.push(duration)
		}
		
		// Always update the updated_at timestamp
		updates.push('updated_at = CURRENT_TIMESTAMP')
		
		if (updates.length === 1) {
			// Only timestamp update, nothing to change
			return this.findById(id)
		}
		
		values.push(id)
		
		const stmt = db.prepare(`
			UPDATE ${this.tableName} 
			SET ${updates.join(', ')} 
			WHERE id = ?
		`)
		
		stmt.run(...values)
		return this.findById(id)
	}
	
	// Delete song
	static delete(id) {
		const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`)
		const result = stmt.run(id)
		return result.changes > 0
	}
	
	// Count total songs
	static count() {
		const stmt = db.prepare(`SELECT COUNT(*) as count FROM ${this.tableName}`)
		return stmt.get().count
	}
	
	// Seed sample data
	static seed() {
		const count = this.count()
		
		if (count === 0) {
			console.log('📝 Seeding songs table...')
			
			const sampleSongs = [
				{
					title: "Graduation Day",
					artist: "Kanye West",
					album: "Graduation",
					year: 2007,
					duration: "3:34"
				},
				{
					title: "Stronger",
					artist: "Kanye West",
					album: "Graduation",
					year: 2007,
					duration: "5:12"
				},
				{
					title: "Good Morning",
					artist: "Kanye West",
					album: "Graduation",
					year: 2007,
					duration: "3:15"
				},
				{
					title: "Can't Tell Me Nothing",
					artist: "Kanye West",
					album: "Graduation",
					year: 2007,
					duration: "4:31"
				},
				{
					title: "Homecoming",
					artist: "Kanye West",
					album: "Graduation",
					year: 2007,
					duration: "3:33"
				},
				{
					title: "Heard 'Em Say",
					artist: "Kanye West",
					album: "Late Registration",
					year: 2005,
					duration: "3:47"
				},
				{
					title: "Gold Digger",
					artist: "Kanye West",
					album: "Late Registration",
					year: 2005,
					duration: "3:27"
				},
				{
					title: "Touch the Sky",
					artist: "Kanye West",
					album: "Late Registration",
					year: 2005,
					duration: "3:56"
				},
				{
					title: "Diamonds from Sierra Leone",
					artist: "Kanye West",
					album: "Late Registration",
					year: 2005,
					duration: "4:32"
				},
				{
					title: "Drive Slow",
					artist: "Kanye West",
					album: "Late Registration",
					year: 2005,
					duration: "6:32"
				},
				{
					title: "Through the Wire",
					artist: "Kanye West",
					album: "The College Dropout",
					year: 2004,
					duration: "3:41"
				},
				{
					title: "Jesus Walks",
					artist: "Kanye West",
					album: "The College Dropout",
					year: 2004,
					duration: "3:14"
				},
				{
					title: "All Falls Down",
					artist: "Kanye West",
					album: "The College Dropout",
					year: 2004,
					duration: "3:43"
				},
				{
					title: "Spaceship",
					artist: "Kanye West",
					album: "The College Dropout",
					year: 2004,
					duration: "5:35"
				},
				{
					title: "Slow Jamz",
					artist: "Kanye West",
					album: "The College Dropout",
					year: 2004,
					duration: "5:17"
				}
			]
			
			sampleSongs.forEach(song => this.create(song))
			console.log(`✅ Seeded ${sampleSongs.length} songs`)
		}
	}
}

export default Song
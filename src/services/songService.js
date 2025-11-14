import Song from '../models/Song.js'

// Get all songs
export const getAllSongs = () => {
	return Song.findAll()
}

// Get song by ID
export const getSongById = (id) => {
	return Song.findById(id)
}

// Get songs by artist
export const getSongsByArtist = (artist) => {
	return Song.findByArtist(artist)
}

// Get songs by album
export const getSongsByAlbum = (album) => {
	return Song.findByAlbum(album)
}

// Create new song
export const createSong = (songData) => {
	const { title, artist, album, year, duration } = songData
	
	// Validation
	if (!title || !artist) {
		throw new Error('Title and artist are required')
	}
	
	// Additional business logic could go here
	// e.g., validate year range, duration format, etc.
	
	return Song.create({ title, artist, album, year, duration })
}

// Update song
export const updateSong = (id, songData) => {
	const { title, artist, album, year, duration } = songData
	
	// Check if song exists
	const existingSong = Song.findById(id)
	if (!existingSong) {
		return null
	}
	
	return Song.update(id, { title, artist, album, year, duration })
}

// Delete song
export const deleteSong = (id) => {
	return Song.delete(id)
}

// Additional service methods
export const getSongCount = () => {
	return Song.count()
}
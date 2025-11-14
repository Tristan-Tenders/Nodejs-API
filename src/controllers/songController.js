import * as songService from '../services/songService.js'

// Get all songs
export const getAllSongs = (req, res) => {
	try {
		const songs = songService.getAllSongs()
		res.status(200).json(songs)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get single song by ID
export const getSongById = (req, res) => {
	try {
		const { id } = req.params
		const song = songService.getSongById(id)
		
		if (!song) {
			return res.status(404).json({ message: "Song not found" })
		}
		
		res.status(200).json(song)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Create new song
export const createSong = (req, res) => {
	try {
		const { title, artist, album, year, duration } = req.body
		
		// Validation
		if (!title || !artist) {
			return res.status(400).json({ message: "Title and artist are required" })
		}
		
		const newSong = songService.createSong({ title, artist, album, year, duration })
		res.status(201).json(newSong)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Update song
export const updateSong = (req, res) => {
	try {
		const { id } = req.params
		const { title, artist, album, year, duration } = req.body
		
		const updatedSong = songService.updateSong(id, { title, artist, album, year, duration })
		
		if (!updatedSong) {
			return res.status(404).json({ message: "Song not found" })
		}
		
		res.status(200).json(updatedSong)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Delete song
export const deleteSong = (req, res) => {
	try {
		const { id } = req.params
		const deleted = songService.deleteSong(id)
		
		if (!deleted) {
			return res.status(404).json({ message: "Song not found" })
		}
		
		res.status(204).send()
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
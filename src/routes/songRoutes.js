import express from "express"
import * as songController from "../controllers/songController.js"
import { logMiddleware } from "../middleware/middleware.js"

// Create a router instance
const router = express.Router()

// Define routes - notice we use router instead of app
// The base path will be added when we mount this router in index.js

router.get("/", logMiddleware, songController.getAllSongs) // GET /songs
router.get("/:id", songController.getSongById) // GET /songs/:id
router.post("/", songController.createSong) // POST /songs
router.put("/:id", songController.updateSong) // PUT /songs/:id
router.delete("/:id", songController.deleteSong) // DELETE /songs/:id

// Export the router
export default router
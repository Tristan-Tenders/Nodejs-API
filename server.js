import express from "express"
import { logMiddleware } from "./middleware/middleware.js"
import { getAllUsers, getUserById, createUser,updateUser,deleteUser } from "./src/controllers/userController.js"

const app = express()
const PORT = 3000

app.use(express.json())

app.get("/users", logMiddleware, getAllUsers)
app.get("/users/:id", getUserById)
app.post("/users", createUser)
app.put("/users/:id", updateUser)
app.delete("/users/:id", deleteUser)

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}/users`)
})

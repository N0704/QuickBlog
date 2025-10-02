import express, { Request, Response } from "express";
import cors from "cors"
import adminRouter from "./routes/adminRoutes";
import blogRouter from "./routes/blogRoutes";

const app = express();

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.get("/", (req : Request, res : Response) => {
    res.send("Hello World")
})

app.use("/api/admin", adminRouter)
app.use("/api/blog", blogRouter)

export default app
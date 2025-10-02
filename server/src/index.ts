import "dotenv/config"
import connectDB from "./configs/db";
import app from "./server";

async function startServer() {
    await connectDB()
    const PORT = Number(process.env.PORT) || 3000
    app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));
}

startServer();
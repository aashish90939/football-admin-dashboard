import express from 'express';
import cors from 'cors'; // Add this
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(cors()); // <-- Enable CORS here // cors is a middleware that allows you to specify which domains are allowed to access your resources
app.use(express.json()); // Parse JSON bodies

app.use('/api/users', userRoutes);// // Use user routes
app.use((req, res) => {
  console.log("Unhandled route:", req.method, req.url);
  res.status(404).send("Not Found");
});

const PORT = process.env.PORT || 5050; // Default to 5050 if PORT is not set in .env
app.listen(PORT, () => { // Start the server
 
  console.log(`🚀 Server running on port ${PORT}`);
});

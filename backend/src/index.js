import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import postsRoutes from './routes/postsRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import playerProfileRoutes from './routes/playerProfileRoutes.js';
dotenv.config();



const app = express();

app.use(express.json({ limit: "10mb" }));  // Limit request body size to 10mb
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Limit URL-encoded data size to 10mb


app.use('/api/users', userRoutes); // User authentication and management routes
app.use("/api/posts", postsRoutes); // Posts management routes (news, events, updates)
app.use("/api/contact-responses", contactRoutes); // Contact form responses management routes
app.use("/api/player_profiles", playerProfileRoutes); // Player profiles management routes
// Catch unhandled routes


app.use((req, res) => {    // Catch-all for unhandled routes
  console.log("Unhandled route:", req.method, req.url); 
  res.status(404).send("Not Found");
  
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
});

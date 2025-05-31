import express from "express";
import {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

router.get("/", getContacts); // GET all contact messages
router.get("/:id", getContactById); // GET one contact by ID
router.post("/", createContact); // POST new contact
router.delete("/:id", deleteContact); // DELETE contact by ID

export default router;

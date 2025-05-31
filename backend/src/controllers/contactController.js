import pool from "../config/db.js";

// GET all contact form entries
export const getContacts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contact ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET a single contact message by ID
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM contact WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching contact:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// CREATE a new contact form submission
export const createContact = async (req, res) => {
  try {
    const { name, email, phone_number, reason, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required" });
    }

    const result = await pool.query(
      `INSERT INTO contact (name, email, phone_number, reason, message, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [name, email, phone_number, reason, message]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating contact:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE a contact message
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM contact WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully", contact: result.rows[0] });
  } catch (err) {
    console.error("Error deleting contact:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

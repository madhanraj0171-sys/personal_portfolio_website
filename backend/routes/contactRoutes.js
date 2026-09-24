import express from 'express';
import mongoose from 'mongoose';
import Contact from '../models/Contact.js';
import { requireAdmin } from '../middleware/admin.js';

const router = express.Router();

let inMemoryContacts = [
  {
    _id: 'msg-sample-1',
    name: 'Academic Mentor',
    email: 'mentor@cse.edu',
    message: 'Great work on the RentWise project architecture! Looking forward to reviewing your DSA submissions.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const isDbConnected = () => mongoose.connection.readyState === 1;

// POST /api/contact - Submit a contact message
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Please provide all required fields: name, email, and message',
    });
  }

  // Basic email validation regex
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address',
    });
  }

  if (message.trim().length < 5) {
    return res.status(400).json({
      success: false,
      error: 'Message must be at least 5 characters long',
    });
  }

  try {
    if (isDbConnected()) {
      const savedContact = await Contact.create({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      return res.status(201).json({
        success: true,
        message: 'Thank you for reaching out, Madhan Raj will get back to you soon!',
        data: savedContact,
      });
    } else {
      const newContact = {
        _id: `msg-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
      };
      inMemoryContacts.unshift(newContact);
      return res.status(201).json({
        success: true,
        message: 'Thank you for reaching out! Your message was recorded successfully.',
        data: newContact,
        note: 'Stored locally in memory (MongoDB not configured yet)',
      });
    }
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to submit message. Please try again or reach out via email directly.',
    });
  }
});

// GET /api/contact - View contact submissions (Protected by ADMIN_KEY)
router.get('/', requireAdmin, async (req, res) => {
  try {
    if (isDbConnected()) {
      const messages = await Contact.find().sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: messages.length,
        data: messages,
      });
    } else {
      return res.json({
        success: true,
        count: inMemoryContacts.length,
        data: inMemoryContacts,
        note: 'Loaded from in-memory fallback',
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

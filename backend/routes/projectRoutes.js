import express from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import { requireAdmin } from '../middleware/admin.js';

const router = express.Router();

// Fallback in-memory project store when MongoDB is not connected
export const defaultProjects = [
  {
    _id: 'proj-1',
    title: 'RentWise',
    description: 'A role-based rental management application connecting tenants and landlords in one platform.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    features: [
      'Tenant and landlord login',
      'Property discovery',
      'Rental information',
      'Maintenance issue reporting',
      'Rent and maintenance payments',
      'Payment history',
      'Notifications',
      'Tenant-landlord communication',
    ],
    github: 'https://github.com/madhanrajb/rentwise',
    liveDemo: 'https://rentwise-demo.vercel.app',
    featured: true,
  },
  {
    _id: 'proj-2',
    title: 'Smart Parking Slot Management System',
    description: 'A system for managing parking slot availability and helping users identify occupied and available parking spaces.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'QR Code'],
    features: [
      'Real-time parking slot availability overview',
      'QR code scan to verify parking slot occupancy',
      'Vehicle check-in and checkout timestamps',
      'Instant slot status updates (Available vs Occupied)',
      'Responsive interface for drivers and parking attendants',
    ],
    github: 'https://github.com/madhanrajb/smart-parking-system',
    liveDemo: 'https://smart-parking-demo.vercel.app',
    featured: true,
  },
  {
    _id: 'proj-3',
    title: 'Algorithms Practice',
    description: 'A collection of programming solutions created while practicing Data Structures and Algorithms.',
    technologies: ['Java', 'C', 'Data Structures', 'Algorithms'],
    features: [
      'Searching (Linear Search, Binary Search)',
      'Sorting (Bubble, Selection, Insertion, Merge, Quick Sort)',
      'Binary Search problems and optimization techniques',
      'Greedy algorithms and problem patterns',
      'Recursion and backtracking implementations',
      'Singly and Doubly Linked Lists with utility methods',
    ],
    github: 'https://github.com/madhanrajb/algorithms-practice',
    liveDemo: 'https://github.com/madhanrajb/algorithms-practice',
    featured: true,
  },
];

let inMemoryProjects = [...defaultProjects];

const isDbConnected = () => mongoose.connection.readyState === 1;

// GET /api/projects - Retrieve all projects
router.get('/', async (req, res) => {
  try {
    if (isDbConnected()) {
      let projects = await Project.find().sort({ createdAt: -1 });
      if (!projects || projects.length === 0) {
        // Auto-seed if database is empty
        await Project.insertMany(defaultProjects.map(({ _id, ...rest }) => rest));
        projects = await Project.find().sort({ createdAt: -1 });
      }
      return res.json({ success: true, count: projects.length, data: projects });
    } else {
      return res.json({
        success: true,
        count: inMemoryProjects.length,
        data: inMemoryProjects,
        note: 'Loaded from local in-memory store (MongoDB not connected)',
      });
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Return fallback rather than breaking the client
    return res.json({
      success: true,
      count: inMemoryProjects.length,
      data: inMemoryProjects,
      warning: 'Fallback used due to database query error',
    });
  }
});

// GET /api/projects/:id - Retrieve single project
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (isDbConnected()) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const project = await Project.findById(id);
        if (project) {
          return res.json({ success: true, data: project });
        }
      }
    }
    const found = inMemoryProjects.find((p) => p._id === id);
    if (!found) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    return res.json({ success: true, data: found });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/projects - Create new project (Protected by ADMIN_KEY)
router.post('/', requireAdmin, async (req, res) => {
  const { title, description, technologies, features, github, liveDemo, featured } = req.body;

  if (!title || !description) {
    return res.status(400).json({ success: false, error: 'Title and description are required' });
  }

  const techArray = Array.isArray(technologies)
    ? technologies
    : typeof technologies === 'string'
    ? technologies.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  const featureArray = Array.isArray(features)
    ? features
    : typeof features === 'string'
    ? features.split('\n').map((f) => f.trim()).filter(Boolean)
    : [];

  try {
    if (isDbConnected()) {
      const newProject = await Project.create({
        title,
        description,
        technologies: techArray,
        features: featureArray,
        github: github || '#',
        liveDemo: liveDemo || '#',
        featured: featured !== undefined ? featured : true,
      });
      return res.status(201).json({ success: true, data: newProject });
    } else {
      const newProject = {
        _id: `proj-${Date.now()}`,
        title,
        description,
        technologies: techArray,
        features: featureArray,
        github: github || '#',
        liveDemo: liveDemo || '#',
        featured: featured !== undefined ? featured : true,
        createdAt: new Date().toISOString(),
      };
      inMemoryProjects.unshift(newProject);
      return res.status(201).json({
        success: true,
        data: newProject,
        note: 'Saved in-memory (MongoDB not connected)',
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/projects/:id - Update existing project (Protected by ADMIN_KEY)
router.put('/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, description, technologies, features, github, liveDemo, featured } = req.body;

  try {
    if (isDbConnected()) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (technologies !== undefined) {
          updateData.technologies = Array.isArray(technologies)
            ? technologies
            : technologies.split(',').map((t) => t.trim()).filter(Boolean);
        }
        if (features !== undefined) {
          updateData.features = Array.isArray(features)
            ? features
            : features.split('\n').map((f) => f.trim()).filter(Boolean);
        }
        if (github !== undefined) updateData.github = github;
        if (liveDemo !== undefined) updateData.liveDemo = liveDemo;
        if (featured !== undefined) updateData.featured = featured;

        const updated = await Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (updated) {
          return res.json({ success: true, data: updated });
        }
      }
    }

    const index = inMemoryProjects.findIndex((p) => p._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    inMemoryProjects[index] = {
      ...inMemoryProjects[index],
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(technologies !== undefined && {
        technologies: Array.isArray(technologies)
          ? technologies
          : technologies.split(',').map((t) => t.trim()).filter(Boolean),
      }),
      ...(features !== undefined && {
        features: Array.isArray(features)
          ? features
          : features.split('\n').map((f) => f.trim()).filter(Boolean),
      }),
      ...(github !== undefined && { github }),
      ...(liveDemo !== undefined && { liveDemo }),
      ...(featured !== undefined && { featured }),
    };

    return res.json({ success: true, data: inMemoryProjects[index] });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/projects/:id - Delete project (Protected by ADMIN_KEY)
router.delete('/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    if (isDbConnected()) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const deleted = await Project.findByIdAndDelete(id);
        if (deleted) {
          return res.json({ success: true, message: 'Project deleted successfully' });
        }
      }
    }

    const index = inMemoryProjects.findIndex((p) => p._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    inMemoryProjects.splice(index, 1);
    return res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

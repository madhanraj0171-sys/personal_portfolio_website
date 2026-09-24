import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import { defaultProjects } from './routes/projectRoutes.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/madhan_portfolio';

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB at:', MONGO_URI.replace(/:([^:@]{4})[^:@]*@/, ':****@'));
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected successfully.');

    console.log('Clearing existing projects...');
    await Project.deleteMany({});

    console.log('Inserting initial projects for Madhan Raj B....');
    const cleanedProjects = defaultProjects.map(({ _id, ...rest }) => rest);
    const inserted = await Project.insertMany(cleanedProjects);

    console.log(`Successfully seeded ${inserted.length} projects:`);
    inserted.forEach((p, idx) => console.log(`  ${idx + 1}. ${p.title}`));

    await mongoose.disconnect();
    console.log('Database disconnected. Seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();

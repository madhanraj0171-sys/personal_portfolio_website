import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    technologies: {
      type: [String],
      required: [true, 'Technologies list is required'],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    github: {
      type: String,
      default: 'https://github.com/madhanrajb',
      trim: true,
    },
    liveDemo: {
      type: String,
      default: '#',
      trim: true,
    },
    featured: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;

const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Job = require('./models/Job');

dotenv.config();

const sampleJobs = [
  {
    jobTitle: 'IoT Intern',
    company: 'SmartNest Labs',
    location: 'Chennai',
    category: 'IoT',
    jobType: 'On-site',
    applyLink: 'https://example.com/jobs/iot-intern',
    description: 'Build smart device prototypes and sensor network solutions.',
  },
  {
    jobTitle: 'Embedded Systems Engineer',
    company: 'CircuitWorks',
    location: 'Bengaluru',
    category: 'Embedded Systems',
    jobType: 'Hybrid',
    applyLink: 'https://example.com/jobs/embedded-engineer',
    description: 'Develop firmware and hardware test automation for embedded controllers.',
  },
  {
    jobTitle: 'Web Development Intern',
    company: 'PixelForge',
    location: 'Coimbatore',
    category: 'Web Development',
    jobType: 'Remote',
    applyLink: 'https://example.com/jobs/web-intern',
    description: 'Help build responsive front-end interfaces and dashboards.',
  },
  {
    jobTitle: 'Software Developer Trainee',
    company: 'CodeSprint',
    location: 'Hyderabad',
    category: 'Software',
    jobType: 'Remote',
    applyLink: 'https://example.com/jobs/software-trainee',
    description: 'Work with a team to build web applications and bug fixes.',
  },
  {
    jobTitle: 'Electronics Design Intern',
    company: 'VoltCore',
    location: 'Pune',
    category: 'Electronics',
    jobType: 'On-site',
    applyLink: 'https://example.com/jobs/electronics-design',
    description: 'Create PCB layouts, component testing, and electrical documentation.',
  },
  {
    jobTitle: 'IoT Product Analyst',
    company: 'SensorSphere',
    location: 'Chennai',
    category: 'IoT',
    jobType: 'Hybrid',
    applyLink: 'https://example.com/jobs/iot-analyst',
    description: 'Analyze telemetry data and create product insights for connected systems.',
  },
  {
    jobTitle: 'Frontend Developer',
    company: 'NovaStack',
    location: 'Bengaluru',
    category: 'Web Development',
    jobType: 'Remote',
    applyLink: 'https://example.com/jobs/frontend-developer',
    description: 'Design and develop clean and accessible user interfaces.',
  },
  {
    jobTitle: 'Automation Software Intern',
    company: 'LogicWorks',
    location: 'Kerala',
    category: 'Software',
    jobType: 'Hybrid',
    applyLink: 'https://example.com/jobs/automation-intern',
    description: 'Automate internal tools and create test scripts for product validation.',
  },
];

const seedJobs = async () => {
  try {
    await connectDB();

    const existingJobs = await Job.countDocuments();

    if (existingJobs > 0) {
      console.log('Sample jobs already exist. No new records inserted.');
      process.exit(0);
    }

    await Job.insertMany(sampleJobs);
    console.log('8 sample jobs added successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedJobs();

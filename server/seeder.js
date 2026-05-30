const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Settings = require('./models/Settings');
const Lead = require('./models/Lead');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/novaspark');
    console.log('MongoDB Connected for Seeding...');

    // Clear existing users and settings
    await User.deleteMany();
    await Settings.deleteMany();
    // Keep leads for testing, or we can add some dummies

    const adminUser = await User.create({
      name: 'Master Admin',
      email: 'admin@novaspark.com',
      password: 'password123', // Will be hashed by pre-save hook
      role: 'admin'
    });

    console.log('Admin user created:', adminUser.email);

    await Settings.create({
      agencyName: 'NovaSpark Creative',
      tagline: 'We build digital experiences',
      about: 'A premier creative agency focused on modern design.',
      foundedYear: '2019',
      address: '123 Creative Studio, Delhi, India',
      phones: ['+91-98765-43210'],
      emails: ['hello@novaspark.com'],
      whatsappNumber: '919876543210',
      workingHours: 'Mon-Sat 9AM-7PM'
    });

    console.log('Settings initialized.');

    // Let's create some dummy leads if there are none
    const leadCount = await Lead.countDocuments();
    if (leadCount === 0) {
      await Lead.create([
        {
          name: 'Rahul Sharma',
          email: 'rahul@example.com',
          phone: '+91-99999-99999',
          company: 'ABC Traders',
          service: 'branding',
          budget: '₹50,000+',
          description: 'Looking to rebrand my entire retail chain.',
          status: 'new',
          priority: 'High',
          source: 'Instagram'
        },
        {
          name: 'Aisha Patel',
          email: 'aisha@example.com',
          phone: '+91-88888-88888',
          company: 'Zara Boutique',
          service: 'web',
          budget: '₹20,000 - ₹50,000',
          description: 'Need a stunning e-commerce website.',
          status: 'contacted',
          priority: 'Medium',
          source: 'Google Search'
        }
      ]);
      console.log('Dummy leads created.');
    }

    console.log('Seeding Complete!');
    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedData();

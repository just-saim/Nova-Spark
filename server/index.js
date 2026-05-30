const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(helmet());

// Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const leadRoutes = require('./routes/leadRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/leads', leadRoutes);

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/novaspark', { serverSelectionTimeoutMS: 2000 });
    console.log('MongoDB Connected');
  } catch (err) {
    console.warn('MongoDB connection failed. Starting fallback in-memory database...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    console.log('Fallback In-Memory MongoDB Connected! (Note: Data will be lost on restart)');
    
    // Seed admin user
    const User = require('./models/User');
    const Settings = require('./models/Settings');
    const Lead = require('./models/Lead');
    
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create({ name: 'Master Admin', email: 'admin@novaspark.com', password: 'password123', role: 'admin' });
      
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
      
      await Lead.create({
        name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91-99999-99999',
        company: 'ABC Traders', service: 'branding', budget: '₹50,000+',
        description: 'Looking to rebrand my entire retail chain.',
        status: 'new', priority: 'High', source: 'Instagram'
      });
      
      console.log('Dummy admin, settings, and leads created.');
    }
  }
};
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

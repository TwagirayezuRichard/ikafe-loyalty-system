// Usage: set MONGO_URI in env, then run `node backend/scripts/create_temp_admin.js`
// Creates or updates a temporary admin user: username=tempadmin, password=TempAdmin123!

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const User = require('../models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ikafe';

async function run() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const username = 'tempadmin';
    const rawPassword = 'TempAdmin123!';
    const email = 'tempadmin@example.local';

    const hashed = await bcrypt.hash(rawPassword, 10);

    let user = await User.findOne({ username });
    if (user) {
      user.password = hashed;
      user.role = 'admin';
      user.email = email;
      await user.save();
      console.log(`Updated existing user '${username}' with new password`);
    } else {
      user = new User({ username, password: hashed, role: 'admin', email });
      await user.save();
      console.log(`Created admin user '${username}'`);
    }

    console.log('Temporary credentials:');
    console.log(`  username: ${username}`);
    console.log(`  password: ${rawPassword}`);
    console.log('Use these credentials to login at the app login form. Change password after first use.');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error creating temp admin:', err);
    process.exit(1);
  }
}

run();

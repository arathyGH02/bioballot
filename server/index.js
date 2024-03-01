const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://0.0.0.0/RegistrationDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const voterSchema = new mongoose.Schema({
  name: String,
  age: Number,
  aadhaar: String,
  email: String,
  dob: Date,
  phoneNumber: String,
  constituency: String,
  panchayath: { type: String, required: false },
  municipality: { type: String, required: false },
  legislativeassembly: String,
  voterid: String,
  password: String
});

const Voter = mongoose.model('Voter', voterSchema);

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
  try {
    const newVoter = new Voter(req.body);
  
    await newVoter.save();
    res.status(200).json({ message: 'Voter registered successfully' });
  } catch (error) {
    console.error('Registration failed:', error.message);
    res.status(500).json({ message: 'Failed to register voter' });
  }
});

app.get('/register', async (req, res) => {
  try {
    console.log('Request received from frontend');
    const voters = await Voter.find();
    res.status(200).json(voters);
  } catch (error) {
    console.error('Failed to fetch voters:', error.message);
    res.status(500).json({ message: 'Failed to fetch voters' });
  }
});

app.post('/voter-login', async (req, res) => {
  const { username, aadhaarNumber, password } = req.body;
  try {
    const voter = await Voter.findOne({ name: username, aadhaar: aadhaarNumber, password: password });
    if (voter) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).json({ message: 'Failed to login' });
  }
});

app.post('/admin-login', (req, res) => {
  const { username, password } = req.body;
  try{
  if (username === 'admin_bioballet' && password === 'admin1234') {
    // Authentication successful
    res.json({ success: true, message: 'Login successful' });
  } else {
    // Authentication failed
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
}catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).json({ message: 'Failed to login' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

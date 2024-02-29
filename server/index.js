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

app.post('/api/login', (req, res) => {
  const { username, aadhaarNumber, password } = req.body;

  // Assuming you have a function to validate the login credentials
  const isValid = validateLoginCredentials(username, aadhaarNumber, password);

  if (isValid) {
    // If the login credentials are valid, return a success message
    res.json({ message: 'Login successful' });
  } else {
    // If the login credentials are invalid, return an error message
    res.status(401).json({ message: 'Invalid username or password' });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

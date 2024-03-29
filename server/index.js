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

const electionSchema = new mongoose.Schema({
  name: String,
  date: Date,
  electionid: String,
  numofcandidate: Number,
  type: { type: String, enum: ['state-assembly', 'lok-sabha', 'local'] },
  constituency: String,
  wardNumber: String,
  panchayat: { type: String, required: false },
  municipality: { type: String, required: false }
});

const Election = mongoose.model('Election', electionSchema);

const candidateSchema = new mongoose.Schema({
  name: String,
  party: String,
  constituency: { type: String, required: false },
  wardnumber: { type: String, required: false },
  electionid: String
});

const Candidate = mongoose.model('Candidate', candidateSchema);

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
  try {
    if (username === 'admin_bioballet' && password === 'admin1234') {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).json({ message: 'Failed to login' });
  }
});

app.post('/add-election', async (req, res) => {
  try {
    const newElection = new Election(req.body);
    await newElection.save();
    res.status(200).json({ message: 'Election added successfully' });
  } catch (error) {
    console.error('Failed to add election:', error.message);
    res.status(500).json({ message: 'Failed to add election' });
  }
});

app.post('/add-candidate', async (req, res) => {
  console.log('Received request to add candidate:', req.body);
  const { name, party, constituency, wardnumber, electionid } = req.body;
  if (!electionid || !name || !party) {
    console.log('Missing required fields');
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const existingElection = await Election.findOne({ electionid });
    if (!existingElection) {
      console.log("no");
      return res.status(400).json({ message: 'Invalid election ID' });
    }
    const candidatesCount = await Candidate.countDocuments({ electionid });
    if (candidatesCount >= existingElection.numofcandidate) {
      console.log("got it");
      return res.status(400).json({ message: 'Maximum number of candidates reached for this election' });
    }
    const newCandidate = new Candidate({ name, party, constituency, wardnumber, electionid });
    await newCandidate.save();
    res.status(200).json({ message: 'Candidate added successfully' });
  } catch (error) {
    console.error('Failed to add candidate:', error.message);
    res.status(500).json({ message: 'Failed to add candidate' });
  }
});

app.get('/add-candidate', async (req, res) => {
  try {
    console.log('Request received from frontend');
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    console.error('Failed to fetch candidates:', error.message);
    res.status(500).json({ message: 'Failed to fetch candidates' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
  electionid: String,
  votes: { type: Number, default: 0 }
});

const Candidate = mongoose.model('Candidate', candidateSchema);

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
  try {

    const { aadhaar, voterid } = req.body;

    // Check if a voter with the same Aadhaar number or Voter ID already exists
    const existingVoter = await Voter.findOne({ $or: [{ aadhaar }, { voterid }] });
    if (existingVoter) {
      console.log("already preseny")
      res.status(400).json({ message: 'Voter already registered' });
    }

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
    const newCandidate = new Candidate({ name, party, constituency, wardnumber, electionid, votes: 0 });
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

app.get('/api/:electionId/add-candidate', async (req, res) => {
  const { electionId } = req.params;
  try {
    const candidates = await Candidate.find({ electionid: electionId }, { name: 1, party: 1, constituency: 1, _id: 1 });
      res.json(candidates);
  } catch (error) {
      console.error('Error fetching candidates:', error);
      res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/submit-vote', async (req, res) => {
  const { electionId, candidateId } = req.body;
  try {
    const candidate = await Candidate.findOneAndUpdate(
      { _id: candidateId, electionid: electionId },
      { $inc: { votes: 1 } }, // Increment the votes count by 1
      { new: true } // Return the updated candidate document
    );
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.status(200).json({ message: 'Vote submitted successfully' });
  } catch (error) {
    console.error('Error submitting vote:', error.message);
    res.status(500).json({ message: 'Failed to submit vote' });
  }
});


app.get('/api/:electionId/get-winner', async (req, res) => {
  const { electionId } = req.params;
  try {
    console.log('Fetching candidates for electionId:', electionId);
    // Find all candidates for the specified election ID
    const electionCandidates = await Candidate.find({ electionid: electionId });
   
    console.log('Candidates found:', electionCandidates);
    
    if (electionCandidates.length === 0) {
      console.log('No candidates found for electionId:', electionId);
      return res.status(404).json({ error: 'No candidates found for this election' });
    }
    
    // Find the candidate with the highest number of votes
    const winner = electionCandidates.reduce((prev, current) => (prev.votes > current.votes) ? prev : current);
    console.log('Winner:', winner);
    
    res.status(200).json({ name: winner.name, party: winner.party });
  } catch (error) {
    console.error('Error fetching winner:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

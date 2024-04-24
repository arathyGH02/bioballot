//Backendcode

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');



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
  password: String,
  facialImage: {
    data: Buffer, // Store the image data as a base64-encoded string
    contentType: String
  },
    fingerprintImage: {
      data: Buffer,
      contentType: String}
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
      console.log("already present")
      res.status(400).json({ message: 'Voter already registered' });
    }
    const newVoter = new Voter({ ...req.body });


    await newVoter.save();
    res.status(200).json({ message: 'Voter registered successfully' });
  } catch (error) {
    console.error('Registration failed:', error.message);
    res.status(500).json({ message: 'Failed to register voter' });
  }
});

const upload = multer({ dest: 'uploads/' });

app.post('/upload-facial-image', upload.single('facialImage'), async (req, res) => {
  try {
    const { voterId } = req.body;
    const voter = await Voter.findOne({ voterid: voterId });
    if (!voter) {
      return res.status(404).json({ message: 'Voter not found' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
      console.log("not uploaded")
    }
    const fileData = req.file.path;
    console.log(fileData)

    voter.facialImage.data = fileData;

    
    voter.facialImage.contentType = req.file.mimetype;
    
    await voter.save();
    res.status(200).json({ message: 'Facial image uploaded successfully' });
  } catch (error) {
    console.error('Failed to upload facial image:', error.message);
    res.status(500).json({ message: 'Failed to upload facial image' });
  }
});

const { spawn } = require('child_process');
const path = require('path');


app.post('/verify-facial-image', upload.single('facialImage'), async (req, res) => {
  try {
    const { voterId } = req.body;
    const voter = await Voter.findOne({ voterid: voterId });
    if (!voter) {
      return res.status(404).json({ message: 'Voter not found' });
    }

    console.log('Received voter ID:', voterId);

    if (!voter.facialImage || !voter.facialImage.data) {
      console.log("Facial image data not found for voter")
      return res.status(400).json({ message: 'Facial image data not found for voter' });
    }
    // Convert the stored image data to base64
    const base64ImageData = voter.facialImage.data.toString('base64');
    console.log("converted")
    console.log(base64ImageData)

    // Spawn a Python process
    const pythonProcess = spawn('python', ['server/image_comparison.py', base64ImageData]); 
    
    let similarityScore = null;
    const similarityThreshold = 30;

    // Handle output from the Python script
    pythonProcess.stdout.on('data', (data) => {
    similarityScore = parseInt(data.toString().trim());
    });

    // Handle errors
    pythonProcess.stderr.on('data', (data) => {
     console.error(`Python script stderr: ${data}`);
    });

    // Handle process exit
    pythonProcess.on('close', (code) => {
    if (!isNaN(similarityScore)) {
      console.log(`Python script exited with code ${code}`);
      console.log(`Similarity Score: ${similarityScore}`);
      if (similarityScore > similarityThreshold){
        res.status(200).json({ message: 'Facial image verified' });
        console.log("user verified");
      }
      else{
          res.status(400).json({ message: 'Facial image not verified' });
          console.log("User not Verified");
      }
  }
 });
 } catch (error) {
    console.error('Failed to verify backend facial image:', error.message);
    res.status(500).json({ message: 'Failed to verify facial image' });
  }
});

// API endpoint to store the captured fingerprint data
app.post('/api/fingerprint', async (req, res) => {
  const { voterId, fingerprintData } = req.body;
  try {
    const voter = await Voter.findOne({ voterid: voterId });
    if (!voter) {
      return res.status(404).json({ message: 'Voter not found' });
    }

    voter.fingerprintImage.data = fingerprintData;
    voter.fingerprintImage.contentType = 'image/bmp'; // Assuming the fingerprint data is in BMP format
    await voter.save();
    res.status(200).json({ message: 'Fingerprint data stored successfully' });
  } catch (error) {
    console.error('Failed to store fingerprint data:', error.message);
    res.status(500).json({ message: 'Failed to store fingerprint data' });
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

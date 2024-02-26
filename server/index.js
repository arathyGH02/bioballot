const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const collection = require("mongodb")
//const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

// Connect to the MongoDB database
mongoose.connect('mongodb://0.0.0.0/RegistrationDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define registration schema
const registrationSchema = new mongoose.Schema({
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

const Registration = mongoose.model('Registration', registrationSchema);

/*Define fingerprint schema
const fingerprintSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    image: Buffer,
    format: String,
    name: String,
    password: String
});

const Fingerprint = mongoose.model('Fingerprint', fingerprintSchema);

// Define facial image schema
const facialImageSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    image: Buffer,
    format: String,
    name: String,
    password: String
});

const FacialImage = mongoose.model('FacialImage', facialImageSchema);
*/
app.use(bodyParser.json());

// Register endpoint
app.post('/register', async(req, res) => {
    console.log('Content-Type:', req.headers['content-type']);
    const {
        name,
        age,
        aadhaar,
        email,
        dob,
        phoneNumber,
        constituency,
        panchayath,
        municipality,
        legislativeassembly,
        voterid,
        password
    } = req.body;
    try{
    const registration = new Registration({
        name,
        age,
        aadhaar,
        email,
        dob,
        phoneNumber,
        constituency,
        panchayath,
        municipality,
        legislativeassembly,
        voterid,
        password
    });

    await registration.save();
        res.redirect('/home');
  
   } catch (err) {
    res.status(400).send('Registration failed: ' + err.message);
  }
});
    

/* Fingerprint endpoint
app.post('/fingerprint', (req, res) => {
    const { userId, name, password, fingerprintImage, fingerprintFormat } = req.body;

    const fingerprint = new Fingerprint({
        userId,
        name,
        password,
        image: fingerprintImage,
        format: fingerprintFormat
    });

    fingerprint.save()
        .then(() => {
            res.status(201).send('Fingerprint saved');
        })
        .catch(err => {
            res.status(400).send('Failed to save fingerprint: ' + err.message);
        });
});

// Facial image endpoint
app.post('/facial-image', (req, res) => {
    const { userId, name, password, facialImage, facialFormat } = req.body;

    const facialImageDoc = new FacialImage({
        userId,
        name,
        password,
        image: facialImage,
        format: facialFormat
    });

    facialImageDoc.save()
        .then(() => {
            res.status(201).send('Facial image saved');
        })
        .catch(err => {
            res.status(400).send('Failed to save facial image: ' + err.message);
        });
});
*/
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

// Connect to the RegistrationDB_Login database
mongoose.connect('mongodb://localhost:27017/RegisterationDB_Login', { useNewUrlParser: true, useUnifiedTopology: true });

// Define registration schema
const registrationSchema = new mongoose.Schema({
    Name: String,
    Age: Number,
    AdhaarNumber: String,
    Email: String,
    DateOfBirth: Date,
    PhoneNumber: String,
    Constituency: String,
    Panchayat: { type: String, required: false },
    Municipality: { type: String, required: false },
    LegislativeAssembly: String,
    Password: String
});

const Registration = mongoose.model('Registration', registrationSchema);

// Connect to the FingerprintDB database
mongoose.connect('mongodb://localhost:27017/FingerprintDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define fingerprint schema
const fingerprintSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    image: Buffer,
    format: String,
    name: String,
    password: String
});

const Fingerprint = mongoose.model('Fingerprint', fingerprintSchema);

app.use(bodyParser.json());

// Register endpoint
app.post('/register', (req, res) => {
    const {
        Name,
        Age,
        AdhaarNumber,
        Email,
        DateOfBirth,
        PhoneNumber,
        Constituency,
        Panchayat,
        Municipality,
        LegislativeAssembly,
        Password
    } = req.body;

    const registration = new Registration({
        Name,
        Age,
        AdhaarNumber,
        Email,
        DateOfBirth,
        PhoneNumber,
        Constituency,
        Panchayat,
        Municipality,
        LegislativeAssembly,
        Password
    });

    registration.save()
        .then(() => {
            res.status(201).send('Registration successful');
        })
        .catch(err => {
            res.status(400).send('Registration failed: ' + err.message);
        });
});

// Fingerprint endpoint
app.post('/fingerprint', (req, res) => {
    const { userId, image, format, name, password } = req.body;

    const fingerprint = new Fingerprint({
        userId,
        image,
        format,
        name,
        password
    });

    fingerprint.save()
        .then(() => {
            res.status(201).send('Fingerprint saved');
        })
        .catch(err => {
            res.status(400).send('Failed to save fingerprint: ' + err.message);
        });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/RegistrationDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define registration schema
const registrationSchema = new mongoose.Schema({
    Name: String,
    Age: Number,
    Email: String,
    Name: String,
    Age: Number,
    Email: String,
    AdhaarNumber: String,
    DateOfBirth: Date,
    PhoneNumber: String,
    Constituency: String,
    Panchayat: { type: String, required: false },
    Municipality: { type: String, required: false },
    LegislativeAssembly: String,
    Password: String
});

const Registration = mongoose.model('Registration', registrationSchema);

// Define fingerprint schema
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

app.use(bodyParser.json());

// Register endpoint
app.post('/register', async (req, res) => {
    const {
        Name,
        Age,
        Email,
        AdhaarNumber,
        DateOfBirth,
        PhoneNumber,
        Constituency,
        Panchayat,
        Municipality,
        LegislativeAssembly,
        Password
    } = req.body;

    try {
        const registration = new Registration({
            Name,
            Age,
            Email,
            AdhaarNumber,
            DateOfBirth,
            PhoneNumber,
            Constituency,
            Panchayat,
            Municipality,
            LegislativeAssembly,
            Password
        });

        await registration.save();

        // Assuming the fingerprint and facial image data are sent in the request body
        const { fingerprintImage, fingerprintFormat, facialImage, facialFormat } = req.body;

        const fingerprint = new Fingerprint({
            userId: registration._id,
            name: registration.Name,
            password: 'password', // Assuming a default password for now
            image: fingerprintImage,
            format: fingerprintFormat
        });

        await fingerprint.save();

        const facialImageDoc = new FacialImage({
            userId: registration._id,
            name: registration.Name,
            password: 'password', // Assuming a default password for now
            image: facialImage,
            format: facialFormat
        });

        await facialImageDoc.save();

        res.status(201).send('Registration, fingerprint, and facial image saved');
    } catch (err) {
        res.status(400).send('Registration failed: ' + err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const router = express.Router();
const Application = require('../models/viewApp');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const getNextAppId = require('../utils/generateAppId');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'signature', maxCount: 1 }
]), async (req, res) => {
  try {

    const existAadhar = await Application.findOne({ aadhar: req.body.aadhar });
    if (existAadhar) {
      return res.status(400).json({ message: 'Aadhar Number Already Exists' });
    }
    const newAppId = await getNextAppId();

    const newApp = new Application({
      applicationId: newAppId,
      ...req.body,
      photo: req.files?.photo?.[0]?.filename || '',
      signature: req.files?.signature?.[0]?.filename || ''
    });
    await newApp.save();
    const pdfDir = path.join(__dirname, '../public/pdfs');
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir);

    const pdfPath = path.join(pdfDir, `${newAppId}.pdf`);
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    doc.pipe(fs.createWriteStream(pdfPath));

    doc.font('Helvetica-Bold')
       .fontSize(22)
       .fillColor('#004080')
       .text('Gradious College Admission Form', { align: 'center' });

    doc.moveDown(1.5);

    doc.font('Helvetica')
       .fontSize(12)
       .fillColor('black')
       .text(`Application ID: ${newAppId}`)
       .text(`Full Name: ${req.body.fullName}`)
       .text(`Father's Name: ${req.body.fatherName}`)
       .text(`Mother's Name: ${req.body.motherName}`)
       .text(`Aadhar Number: ${req.body.aadhar}`)
       .text(`Course: ${req.body.course}`)
       .text(`Branch: ${req.body.branch}`)
       .text(`EAMCET Rank: ${req.body.emcetMarks}`)
       .text(`10th Percentage: ${req.body.tenthPercentage}%`)
       .text(`Intermediate Percentage: ${req.body.interPercentage}%`)
       .text(`DOB: ${req.body.dob}`)
       .text(`Email: ${req.body.email}`)
       .text(`Phone: ${req.body.phone}`);

    doc.moveDown(1);

   
    if (newApp.photo) {
      doc.text('Photo:');
      doc.image(path.join(__dirname, '../public/uploads', newApp.photo), { width: 100 });
    }

    if (newApp.signature) {
      doc.moveDown(0.5);
      doc.text('Signature:');
      doc.image(path.join(__dirname, '../public/uploads', newApp.signature), { width: 100 });
    }

    doc.end();

   
    res.status(201).json({
      message: 'Application submitted successfully',
      pdfUrl: `/pdfs/${newAppId}.pdf` 
    });

  } catch (err) {
    console.error('Error submitting application:', err);
    res.status(500).json({ message: 'Submission failed' });
  }
});

router.get('/', async (req, res) => {
  try {
    const applications = await Application.find({}, {
      applicationId: 1, fullName: 1, course: 1, branch: 1,
      emcetMarks: 1, phone: 1, tenthPercentage: 1, interPercentage: 1,
      photo: 1, signature: 1, submittedAt: 1, status: 1, remarks: 1
    }).sort({ submittedAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
});

router.get('/:appId', async (req, res) => {
  try {
    const app = await Application.findOne({ applicationId: req.params.appId });
    if (!app) return res.status(404).json({ message: 'Application not found' });
    res.json(app);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/update-status/:appId', async (req, res) => {
  try {
    const { appId } = req.params;
    const { status, remarks } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const app = await Application.findOneAndUpdate(
      { applicationId: appId },
      { status, remarks },
      { new: true }
    );

    if (!app) return res.status(404).json({ message: 'Application not found' });

    res.json({ message: `Application ${status} successfully`, application: app });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/analytics-data', async (req, res) => {
  try {
    const applications = await Application.find({}, 'course submittedAt'); // fetch only needed fields

  
    const courseCount = {};
    applications.forEach(app => {
      if (app.course) courseCount[app.course] = (courseCount[app.course] || 0) + 1;
    });

    const last7Days = [...Array(7)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().slice(0, 10);
    }).reverse();

    const chartData = last7Days.map(day =>
      applications.filter(app => app.submittedAt && app.submittedAt.toISOString().startsWith(day)).length
    );

    res.json({
      totalApplications: applications.length,
      courseCount,
      last7Days,
      chartData
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch analytics data' });
  }
});


module.exports = router;

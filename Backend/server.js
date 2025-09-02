const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/application');
const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
dotenv.config();
const app = express();


app.use(cors());
app.use(bodyParser.json());

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',(req,res)=>{
  res.redirect('Home.html');
})

// Serve signup.html for /signup route
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});
app.get('/Login',(req,res)=>{
  res.sendFile(path.join(__dirname,'../public/Login.html'));
});
app.get('/ApplyNow',(req,res)=>{
  res.sendFile(path.join(__dirname,'../public/ApplyNow.html'));
});
app.use('/pdfs', express.static(path.join(__dirname, 'public/pdfs')));
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/AdminDashboard.html'));
});
app.get('/analytics', (req,res) => {
  res.sendFile(path.join(__dirname, '../public/Analytics.html'));
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/application', applicationRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

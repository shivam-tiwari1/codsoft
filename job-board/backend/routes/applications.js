const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const Application = require('../models/Application');
const Job = require('../models/Job');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

router.post('/:jobId', auth, upload.single('resume'), async (req,res)=>{
  try {
    const job = await Job.findById(req.params.jobId);
    if(!job) return res.status(404).json({ msg:'Job not found' });

    const application = new Application({
      job: job.id,
      candidate: req.user.id,
      message: req.body.message || '',
      resumePath: req.file ? req.file.path : null
    });
    await application.save();

    // send an email to employer (simplified: sending to configured EMAIL_USER)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New application for ${job.title}`,
      text: `A new application was submitted for ${job.title}.`
    };
    transporter.sendMail(mailOptions, (err, info) => { if (err) console.error('Mail err', err); });

    res.json(application);
  } catch(err){ console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;

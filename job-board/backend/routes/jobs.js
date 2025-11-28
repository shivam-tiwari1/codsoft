const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');

// Create job
router.post('/', auth, async (req,res)=>{
  try {
    const job = new Job({ ...req.body, postedBy: req.user.id });
    await job.save();
    res.json(job);
  } catch (err){ console.error(err); res.status(500).send('Server error'); }
});

// Get jobs with simple search
router.get('/', async (req,res)=>{
  try {
    const q = req.query.q || '';
    const jobs = await Job.find({
      $or: [
        { title: new RegExp(q, 'i') },
        { company: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') }
      ]
    }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch(err){ console.error(err); res.status(500).send('Server error'); }
});

// Get job by id
router.get('/:id', async (req,res)=>{
  try {
    const job = await Job.findById(req.params.id);
    if(!job) return res.status(404).json({ msg:'Job not found' });
    res.json(job);
  } catch(err){ console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;

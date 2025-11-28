const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['employer','candidate'])
], async (req,res)=>{
  const errors = validationResult(req); if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name,email,password,role,company } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User exists' });
    user = new User({ name,email,password,role,company });
    const salt = await bcrypt.genSalt(10); user.password = await bcrypt.hash(password,salt);
    await user.save();
    const payload = { user:{ id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:'7d' }, (err,token)=> {
      if(err) throw err;
      res.json({ token, user:{ id:user.id, name:user.name, email:user.email, role:user.role } });
    });
  } catch(err){ console.error(err); res.status(500).send('Server error'); }
});

router.post('/login', [
  body('email').isEmail(), body('password').exists()
], async (req,res)=>{
  const errors = validationResult(req); if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:'7d' }, (err,token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    });
  } catch(err){ console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;

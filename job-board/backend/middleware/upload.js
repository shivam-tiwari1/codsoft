const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null,'uploads/'),
  filename: (req,file,cb)=>{
    const unique = Date.now() + '-' + Math.round(Math.random()*1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const fileFilter = (req,file,cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('application/')) cb(null,true);
  else cb(new Error('Only PDF or document files are allowed'), false);
};

module.exports = multer({ storage, fileFilter });

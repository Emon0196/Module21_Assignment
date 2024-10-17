const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let student = await Student.findOne({ email });
    if (student) return res.status(400).send('Student already registered.');

    student = new Student({ name, email, password });
    await student.save();

    const token = jwt.sign({ _id: student._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true }).send({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let student = await Student.findOne({ email });
    if (!student) return res.status(400).send('Invalid email or password.');

    const isMatch = await student.comparePassword(password);
    if (!isMatch) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ _id: student._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true }).send({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
};



// Profile Read
exports.getProfile = async (req, res) => {
    try {
      const student = await Student.findById(req.student._id).select('-password');
      if (!student) return res.status(404).send('Student not found.');
      res.send(student);
    } catch (error) {
      res.status(500).send('Server error');
    }
  };
  
  // Profile Update
  exports.updateProfile = async (req, res) => {
    try {
      const updates = req.body;
      const student = await Student.findByIdAndUpdate(req.student._id, updates, { new: true });
      res.send(student);
    } catch (error) {
      res.status(500).send('Server error');
    }
  };
  
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/
  },
  password: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['Patient', 'Doctor'],
    default: 'Patient'
  },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    default: 'AB+'
  },
  dob: {
    type: String,
    required: false,
    default:'2004-10-24'
  },
  number: {
    type: String,
    required: false,
    match: /^\d{10}$/
  },
  familyMemberNumber: {
    type: String,
    match: /^\d{9}$/,
    required: false
  }
});

module.exports  = mongoose.model('Users', userSchema)
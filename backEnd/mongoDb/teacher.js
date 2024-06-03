const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  subject: String,
});

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;

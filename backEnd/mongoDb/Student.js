const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  category: {
    type: String,
    enum: ['bootStrap', 'junior', 'senior'],
    default: 'Etudient',
  },
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;

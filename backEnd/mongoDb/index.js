const mongoose = require('mongoose');
const Student = require('./Student');
const Teacher = require('./teacher');

const mongoUri = 'mongodb://127.0.0.1:27017/RBKSchool';

mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => console.log(err));

const db = mongoose.connection;

const getAllStudents = async () => {
  try {
    const students = await Student.find();
    return students;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createStudent = async (studentData) => {
  try {
    const newStudent = new Student(studentData);
    const savedStudent = await newStudent.save();
    return savedStudent;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getStudentById = async (studentId) => {
  try {
    const student = await Student.findById(studentId);
    return student;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateStudent = async (studentId, updatedData) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(studentId, updatedData, { new: true });
    return updatedStudent;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteStudent = async (studentId) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    return deletedStudent;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllTeachers = async () => {
  try {
    const teachers = await Teacher.find();
    return teachers;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createTeacher = async (teacherData) => {
  try {
    const newTeacher = new Teacher(teacherData);
    const savedTeacher = await newTeacher.save();
    return savedTeacher;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTeacherById = async (teacherId) => {
  try {
    const teacher = await Teacher.findById(teacherId);
    return teacher;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateTeacher = async (teacherId, updatedData) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, updatedData, { new: true });
    return updatedTeacher;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteTeacher = async (teacherId) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
    return deletedTeacher;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  db,
  getAllStudents,
  createStudent,
  getStudentById,
  deleteStudent,
  updateStudent,
  getAllTeachers,
  createTeacher,
  getTeacherById,
  deleteTeacher,
  updateTeacher,
};

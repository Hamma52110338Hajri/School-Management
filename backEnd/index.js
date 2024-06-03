const express = require('express');
const cors = require('cors');
const {
  db,
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  getAllTeachers,
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = require('./mongoDb/index');

const port = 1991;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/students', async (req, res) => {
  try {
    const students = await getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const newStudent = await createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/students/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await getStudentById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/students/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedStudent = await updateStudent(studentId, req.body);

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await deleteStudent(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(deletedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/teachers', async (req, res) => {
  try {
    const teachers = await getAllTeachers();
    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/teachers', async (req, res) => {
  try {
    const newTeacher = await createTeacher(req.body);
    res.status(201).json(newTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/teachers/:id', async (req, res) => {
  try {
    const teacherId = req.params.id;
    const teacher = await getTeacherById(teacherId);

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/teachers/:id', async (req, res) => {
  try {
    const teacherId = req.params.id;
    const updatedTeacher = await updateTeacher(teacherId, req.body);

    if (!updatedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/teachers/:id', async (req, res) => {
  try {
    const teacherId = req.params.id;
    const deletedTeacher = await deleteTeacher(teacherId);

    if (!deletedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.status(200).json(deletedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//////////////////////////////////////////////////////////////////////////////class
app.get('/api/classes', async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/classes', async (req, res) => {
  const { name } = req.body;

  try {
    const newClass = await Class.create({ name });
    res.status(201).json(newClass);
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/api/classes/:classId/teachers', async (req, res) => {
  const { classId } = req.params;
  const { name, subject } = req.body;

  try {
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { teachers: { name, subject } } },
      { new: true }
    );
    res.json(updatedClass.teachers);
  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/api/classes/:classId/students', async (req, res) => {
  const { classId } = req.params;
  const { name, category } = req.body;

  try {
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { students: { name, category } } },
      { new: true }
    );
    res.json(updatedClass.students);
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).send('Internal Server Error');
  }
});
///////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

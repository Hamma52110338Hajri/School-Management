// Students.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Students.css';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', description: '', imageUrl: '', category: 'bootStrap' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:1991/api/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  };

  const addStudent = () => {
    axios.post('http://localhost:1991/api/students', newStudent)
      .then(response => {
        setStudents([...students, response.data]);
        setNewStudent({ name: '', description: '', imageUrl: '', category: 'bootStrap' });
      })
      .catch(error => {
        console.error('Error adding student:', error);
      });
  };

  const deleteStudent = (studentId) => {
    axios.delete(`http://localhost:1991/api/students/${studentId}`)
      .then(() => {
        setStudents(students.filter(student => student._id !== studentId));
      })
      .catch(error => {
        console.error('Error deleting student:', error);
      });
  };

  const updateStudent = () => {
    if (!selectedStudent) {
      return;
    }

    axios.put(`http://localhost:1991/api/students/${selectedStudent._id}`, selectedStudent)
      .then(response => {
        const updatedStudents = students.map(student =>
          student._id === selectedStudent._id ? response.data : student
        );
        setStudents(updatedStudents);
        setSelectedStudent(null);
      })
      .catch(error => {
        console.error('Error updating student:', error);
      });
  };

  const selectStudentForUpdate = (student) => {
    setSelectedStudent({ ...student });
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Students</h2>

      <div>
        <input
          type="text"
          placeholder="Search by name or category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ul>
        {filteredStudents.map(student => (
          <li key={student._id}>
            <img src={student.imageUrl} alt={student.name} />
            {student.name} - {student.category}
            <button onClick={() => deleteStudent(student._id)}>Delete</button>
            <button onClick={() => selectStudentForUpdate(student)}>Update</button>
          </li>
        ))}
      </ul>

      <div>
        <h3>{selectedStudent ? `Update ${selectedStudent.name}'s Info` : 'Add Student'}</h3>
        <input
          type="text"
          placeholder="Name"
          value={selectedStudent ? selectedStudent.name : newStudent.name}
          onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={selectedStudent ? selectedStudent.description : newStudent.description}
          onChange={(e) => setSelectedStudent({ ...selectedStudent, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={selectedStudent ? selectedStudent.imageUrl : newStudent.imageUrl}
          onChange={(e) => setSelectedStudent({ ...selectedStudent, imageUrl: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={selectedStudent ? selectedStudent.category : newStudent.category}
          onChange={(e) => setSelectedStudent({ ...selectedStudent, category: e.target.value })}
        />
          <div>
        
            <button onClick={() => setSelectedStudent(null)}>Cancel</button>
          </div>
          <button onClick={addStudent}>Add Student</button>
      </div>
    </div>
  );
};

export default Students;

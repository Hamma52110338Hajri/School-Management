// Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [newClassName, setNewClassName] = useState('');

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
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

  const fetchTeachers = () => {
    axios.get('http://localhost:1991/api/teachers')
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error('Error fetching teachers:', error);
      });
  };

  const createNewClass = () => {
    // Implement your logic to create a new class and add it to the backend
    // You may need to make a POST request to your API endpoint
    // Example: axios.post('http://localhost:1991/api/classes', { name: newClassName })
    console.log(`Creating a new class: ${newClassName}`);
    // Clear the input field after creating the class
    setNewClassName('');
  };
 

  return (
    <div className="container">
      <div className="classroom">
        <h6>Class Chort2 RBK Kef </h6>

        <div className="teachers">
          <h3>Teachers:</h3>
          <ul className="teacher-list">
            {teachers.map(teacher => (
              <li key={teacher._id}>
                <div>
                  <img src={teacher.imageUrl} alt={teacher.name} />
                  <p>{teacher.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="students">
          <h3>Students:</h3>
          <ul className="student-list">
            {students.map(student => (
              <li key={student._id}>
                <div>
                  <img src={student.imageUrl} alt={student.name} />
                  <p>{student.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add a new class input and button */}
   
      </div>
      <div>
      <input
        type="text"
        placeholder="Enter new class name"
        value={newClassName}
        onChange={(e) => setNewClassName(e.target.value)}
      />
      <button onClick={createNewClass}>Add New Class</button>
    </div>
    </div>
  );
};

export default Home;

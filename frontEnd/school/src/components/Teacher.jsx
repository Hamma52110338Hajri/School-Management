// Teachers.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Teachers.css';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ name: '', description: '', imageUrl: '', subject: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = () => {
    axios.get('http://localhost:1991/api/teachers')
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error('Error fetching teachers:', error);
      });
  };

  const addTeacher = () => {
    axios.post('http://localhost:1991/api/teachers', newTeacher)
      .then(response => {
        setTeachers([...teachers, response.data]);
        setNewTeacher({ name: '', description: '', imageUrl: '', subject: '' });
      })
      .catch(error => {
        console.error('Error adding teacher:', error);
      });
  };

  const deleteTeacher = (teacherId) => {
    axios.delete(`http://localhost:1991/api/teachers/${teacherId}`)
      .then(() => {
        setTeachers(teachers.filter(teacher => teacher._id !== teacherId));
      })
      .catch(error => {
        console.error('Error deleting teacher:', error);
      });
  };

  const updateTeacher = () => {
    if (!selectedTeacher) {
      return;
    }

    axios.put(`http://localhost:1991/api/teachers/${selectedTeacher._id}`, selectedTeacher)
      .then(response => {
        const updatedTeachers = teachers.map(teacher =>
          teacher._id === selectedTeacher._id ? response.data : teacher
        );
        setTeachers(updatedTeachers);
        setSelectedTeacher(null);
      })
      .catch(error => {
        console.error('Error updating teacher:', error);
      });
  };

  const selectTeacherForUpdate = (teacher) => {
    setSelectedTeacher({ ...teacher });
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Teachers</h2>

      <div>
        <input
          type="text"
          placeholder="Search by name or subject"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ul>
        {filteredTeachers.map(teacher => (
          <li key={teacher._id}>
            {teacher.name} - {teacher.subject}
            <button onClick={() => deleteTeacher(teacher._id)}>Delete</button>
            <button onClick={() => selectTeacherForUpdate(teacher)}>Update</button>
          </li>
        ))}
      </ul>

      <div>
        <h3>{selectedTeacher ? `Update ${selectedTeacher.name}'s Info` : 'Add Teacher'}</h3>
        <input
          type="text"
          placeholder="Name"
          value={selectedTeacher ? selectedTeacher.name : newTeacher.name}
          onChange={(e) => setSelectedTeacher({ ...selectedTeacher, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={selectedTeacher ? selectedTeacher.description : newTeacher.description}
          onChange={(e) => setSelectedTeacher({ ...selectedTeacher, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={selectedTeacher ? selectedTeacher.imageUrl : newTeacher.imageUrl}
          onChange={(e) => setSelectedTeacher({ ...selectedTeacher, imageUrl: e.target.value })}
        />
        <input
          type="text"
          placeholder="Subject"
          value={selectedTeacher ? selectedTeacher.subject : newTeacher.subject}
          onChange={(e) => setSelectedTeacher({ ...selectedTeacher, subject: e.target.value })}
        />
        
          <div>
            <button onClick={updateTeacher}>Update Teacher</button>
            <button onClick={() => setSelectedTeacher(null)}>Cancel</button>
          </div>
       
         <button onClick={addTeacher}>Add Teacher</button>
       
      </div>
    </div>
  );
};

export default Teachers;

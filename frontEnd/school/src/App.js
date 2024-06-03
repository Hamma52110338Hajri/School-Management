// App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Students from './components/Students';
import Teachers from './components/Teacher';

const App = () => {
  const [currentView, setCurrentView] = useState('home');

  const changeView = (view) => {
    setCurrentView(view);
  };

  return (
    <div>
      <Navbar changeView={changeView} />
      <div className="container mt-3">
        {currentView === 'home' && <Home />}
        {currentView === 'students' && <Students />}
        {currentView === 'teachers' && <Teachers />}
      </div>
    </div>
  );
};

export default App;

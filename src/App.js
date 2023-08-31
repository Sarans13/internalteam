import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import TeamsPortal from './components/TeamsPortal';
import DataDisplay from './components/DataDisplay';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element= {<TeamsPortal/>} />
        <Route path="/DataDisplay" element={<DataDisplay/>} />
      </Routes>
    </Router>
  );
};

export default App;

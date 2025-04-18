import { BrowserRouter  as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import FleetManager from './FleetManager';
import Navbar from './Navbar';

function App() {


  return (
      <Router>
          <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/fleet" element={<FleetManager />} />
        </Routes>
      </Router>
  );
}

export default App;

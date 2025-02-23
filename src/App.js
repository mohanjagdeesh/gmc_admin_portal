import './App.css';
import Home from './pages/home/home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffEnrollment from './pages/staff-enrollment/staff-enrollment';
import McCorner from './pages/mc-corner/mc-corner';
import Hods from './pages/hods/hods';
import GmcBody from './pages/gmc-body/gmc-body';

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/staff-enrollment' element={<StaffEnrollment />} />
        <Route path='/mc-corner' element={<McCorner />} />
        <Route path='/hods' element={<Hods />} />
        <Route path='/gmc-body' element={<GmcBody />} />
      </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;

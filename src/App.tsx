import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Diagnosa from './pages/Diagnosa';
import Hasil from './pages/Hasil';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnosa" element={<Diagnosa />} />
        <Route path="/hasil" element={<Hasil />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Diagnosa from './pages/Diagnosa';
import Hasil from './pages/Hasil';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Diagnosa />} />
        <Route path="/hasil" element={<Hasil />} />
      </Routes>
    </BrowserRouter>
  );
}
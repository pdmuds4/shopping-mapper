import { Routes, Route } from 'react-router-dom';
import { Home, Login, Register } from './routes';

import './global.css';

const App: React.FC = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register"  element={<Register />}/>
      </Routes>
    </>
  )
}

export default App

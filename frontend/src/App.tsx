import { Routes, Route } from 'react-router-dom';
import { Home, Login } from './routes';

const App: React.FC = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App

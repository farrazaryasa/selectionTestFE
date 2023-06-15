import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import VerificationPage from './pages/Verification';

function App() {

  return (
    <>

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/verification/:token' element={<VerificationPage />} />
      </Routes>
    </>
  );
}

export default App;

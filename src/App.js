import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import VerificationPage from './pages/Verification';
import ProfileUser from './pages/Profile';
import Navbar from './components/navbar/Navbar';
import Homepage from './pages/Homepage';
import PostDetails from './pages/PostDetails';

function App() {
  const navigate = useNavigate()

  const CheckLogin = (props) => {
    const checkStorage = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : null
    if (checkStorage === null) {
      return <Navigate to={'/login'} />
    }

    return props.children ? props.children : <Outlet />
  }

  const CheckActive = (props) => {
    const checkStorage = localStorage.getItem('loginDetails') ? JSON.parse(localStorage?.getItem("loginDetails")) : null
    if (checkStorage !== null) {
      return <Navigate to={'/'} />
    }

    return props.children ? props.children : <Outlet />
  }

  return (
    <>
      <div className='flex flex-col gap-6'>
        <Routes>
          <Route path='/profile' element={<CheckLogin><Navbar /><ProfileUser /></CheckLogin>} />
          <Route path='/' element={<CheckLogin><Navbar /><Homepage /></CheckLogin>} />
          <Route path='/post/:id' element={<CheckLogin><Navbar /><PostDetails /></CheckLogin>} />
        </Routes>
      </div>

      <Routes>
        <Route path='/login' element={<CheckActive><Login /></CheckActive>} />
        <Route path='/verification/:token' element={<VerificationPage />} />
      </Routes>
    </>
  );
}

export default App;

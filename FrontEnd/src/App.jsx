
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom'
import './App.css'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/signUpPage'
import TodoList from '../components/TodoList'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ResetPassword from './pages/ResetPassword'
import ResetPasswordConfirm from './pages/ResetPasswordConfirm'

function App() {
  const [isAuthenticated, setIsAuthenticated] =useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { // check if user is authenticated by calling a protected endpoint
    axios.get("http://localhost:4002/", {withCredentials: true})
      .then(()=> setIsAuthenticated(true))
      .catch(()=> setIsAuthenticated(false))
      .finally(()=> setLoading(false))
  }, []);

  if(loading) return <div className="">Loading ...</div>

  return (
    <>
    <div className="max-w-xl mx-auto h-[92vh] min-w-[370px] ">
      <Router>
        <div className="mt-10">
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path='/dashboard' element={isAuthenticated ? <TodoList /> : <Navigate to="/" /> } />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path='/reset-password/:token' element={<ResetPasswordConfirm /> } />

            <Route path="*" element={<div className="text-center py-10">404 - Page Not Found</div>} />
          </Routes>          
        </div>
      </Router>
    </div>
    </>
  )
}

export default App

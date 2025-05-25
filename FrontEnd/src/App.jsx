
// import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom'
// import './App.css'
// import SignInPage from './pages/SignInPage'
// import SignUpPage from './pages/signUpPage'
// import TodoList from '../components/TodoList'
// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import ResetPassword from './pages/ResetPassword'
// import ResetPasswordConfirm from './pages/ResetPasswordConfirm'

// function App() {
//   const [isAuthenticated, setIsAuthenticated] =useState(false);
//   const [loading, setLoading] = useState(true);

//   const checkAuth = async () => {
//     try {
//       await axios.get("https://check-box-todolist-app.onrender.com/", {withCredentials: true})
//       setIsAuthenticated(true);
//       console.log('Auth check result: ', isAuthenticated);
      
//     } catch (err) {
//       setIsAuthenticated(false)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => { // check if user is authenticated by calling a protected endpoint
//     checkAuth
//   }, []);

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true)
//   }

//   if(loading) return <div className="">Loading ...</div>

//   return (
//     <>
//     <div className="max-w-xl mx-auto h-[92vh] min-w-[370px] ">
//       <Router>
//         <div className="mt-10">
//           <Routes>
//             <Route path="/" element={ isAuthenticated ? <Navigate to='/dashboard' replace /> : <SignInPage onLoginSuccess={handleLoginSuccess} />} />
//             <Route path="/signup" element={<SignUpPage />} />
//             <Route path='/dashboard' element={isAuthenticated ? <TodoList /> : <Navigate to="/" replace /> } />
//             <Route path="/reset-password" element={<ResetPassword />} />
//             <Route path='/reset-password/:token' element={<ResetPasswordConfirm /> } />

//             <Route path="*" element={<div className="text-center py-10">404 - Page Not Found</div>} />
//           </Routes>          
//         </div>
//       </Router>
//     </div>
//     </>
//   )
// }

// export default App



import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/signUpPage';
import TodoList from '../components/TodoList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordConfirm from './pages/ResetPasswordConfirm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      await axios.get("https://check-box-todolist-app.onrender.com/auth/check", { withCredentials: true });
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) return <div className="">Loading ...</div>;

  return (
    <>
      <div className="max-w-xl mx-auto h-[92vh] min-w-[370px]">
        <Router>
          <div className="mt-10">
            <Routes>
              <Route path="/" element={<SignInPage setIsAuthenticated={setIsAuthenticated} checkAuth={checkAuth} />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/dashboard" element={isAuthenticated ? <TodoList /> : <Navigate to="/" />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/reset-password/:token" element={<ResetPasswordConfirm />} />
              <Route path="*" element={<div className="text-center py-10">404 - Page Not Found</div>} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
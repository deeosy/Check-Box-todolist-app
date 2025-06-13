import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/signUpPage';
import TodoList from '../components/TodoList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordConfirm from './pages/ResetPasswordConfirm';
import { motion, AnimatePresence } from 'framer-motion';

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
      setTimeout(() => setLoading(false), 2000);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <AnimatePresence>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <motion.div
          className="w-32 h-32 bg-sky-300 flex items-center justify-center relative"
          initial={{ 
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' // perfect square
          }}
          animate={{
            clipPath: [
              'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // square
              'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)', // top edge starts narrowing
              'polygon(50% -10%, 50% -10%, 100% 90%, 0% 90%)', // top protrudes up, bottom starts
              'polygon(50% -20%, 50% -20%, 90% 75%, 10% 75%)', // more protrusion
              'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)' // final hexagon
            ]
          }}
          transition={{ 
            duration: 3,
            ease: 'easeInOut',
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 0, 0.8, 1.2, 1, 0],
              opacity: [0, 0, 1, 1, 1, 0]
            }}
            transition={{ 
              duration: 3,
              times: [0, 0.6, 0.7, 0.85, 0.95, 1],
              ease: 'easeOut',
              repeat: Infinity,
              repeatDelay: 0.5
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-16 h-16 stroke-blue-600"
            >
              <motion.polyline 
                points="4 12 9 17 20 6"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: [0, 0, 1, 1, 1, 0]
                }}
                transition={{
                  duration: 3,
                  times: [0, 0.65, 0.8, 0.9, 0.95, 1],
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
              <motion.polyline
                points="4 12 9 17"
                className="stroke-pink-300"
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: [0, 0, 1, 1, 1, 0]
                }}
                transition={{
                  duration: 3,
                  times: [0, 0.7, 0.85, 0.9, 0.95, 1],
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            </svg>
          </motion.div>
        </motion.div>
        {/* Loading text */}
        <motion.div
          className="mt-6 text-center"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Loading
          </h2>
          <div className="flex justify-center space-x-1">
            <motion.div
              className="w-2 h-2 bg-indigo-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0
              }}
            />
            <motion.div
              className="w-2 h-2 bg-indigo-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0.2
              }}
            />
            <motion.div
              className="w-2 h-2 bg-indigo-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0.4
              }}
            />
          </div>
        </motion.div>
      </div>
      </AnimatePresence>
    );
  }

  return (
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
  );
}

export default App;
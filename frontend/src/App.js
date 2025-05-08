import logo from './logo.svg';
import './styles/global.css';
import { useState, useEffect } from 'react';
import GlobalContext from './context/GlobalContext';
import { RouterProvider } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
// import loginRouter from './routes/AuthRoutesSignin';
import Login from './pages/Login';

function App() {
  
  const [globalState, setGlobalState] = useState(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");
    return {token, userEmail};
  });

  const router = AppRoutes(!!globalState.token);

  const getToken = () => {
    try {
      const token = localStorage.getItem("token");
      if(token){
        const userEmail = localStorage.getItem("userEmail");
        globalState({...globalState, token, userEmail})
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => 
    getToken()
  , []);

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {globalState.token ? <RouterProvider router={router} /> : <Login />}
    </GlobalContext.Provider>
  );
}

export default App;

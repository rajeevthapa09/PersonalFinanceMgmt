import logo from './logo.svg';
import './styles/global.css';
import { useState, useEffect } from 'react';
import GlobalContext from './context/GlobalContext';
import { RouterProvider } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
// import loginRouter from './routes/AuthRoutesSignin';
import Login from './pages/Login';
import { userEmail } from './services/network';

function App() {
  
  const [globalState, setGlobalState] = useState({token: null, userEmail:""});

  const router = AppRoutes(!!globalState.token);

  const getToken = () => {
    try {
      const token = localStorage.getItem("token");
      console.log("111")
      if(token){
        const userEmail = localStorage.getItem("userEmail");
        console.log("222")
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
      <RouterProvider router={router} />  
    </GlobalContext.Provider>
  );
}

export default App;

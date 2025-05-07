import logo from './logo.svg';
import './styles/global.css';
import { useState, useEffect } from 'react';
import GlobalContext from './context/GlobalContext';
import { RouterProvider } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
// import loginRouter from './routes/AuthRoutesSignin';

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
        const userId = localStorage.getItem("userId");
        // const userName = localStorage.getItem("userName");
        console.log("user", userEmail, "token", token, "role", globalState.role);
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

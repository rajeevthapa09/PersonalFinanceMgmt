import logo from './logo.svg';
import './styles/global.css';
import { useState } from 'react';
import GlobalContext from './context/GlobalContext';
import { RouterProvider } from 'react-router-dom';
import appRouter from './routes/UserDashboardLayout';
import loginRouter from './routes/AuthRoutesSignin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState[0];
  const [state, setState] = useState({token: localStorage.getItem("token")});

  return (
    <div>
      <GlobalContext.Provider value={{ state, setState }}>
         <RouterProvider router={appRouter} /> : <RouterProvider router={loginRouter} />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import GlobalContext from './context/GlobalContext';
import { RouterProvider } from 'react-router-dom';
import appRouter from './routes/UserDashboardLayout';
import loginRouter from './routes/AuthRoutesSignin';

function App() {
  const [state, setState] = useState({});
  const token = localStorage.getItem("token");

  return (
    <div>
      <GlobalContext.Provider value={{ state, setState }}>
        {token ? <RouterProvider router={appRouter} /> : <RouterProvider router={loginRouter} />}
      </GlobalContext.Provider>
    </div>
  );
}

export default App;

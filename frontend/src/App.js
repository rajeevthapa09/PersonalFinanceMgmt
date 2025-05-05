import logo from './logo.svg';
import './styles/global.css';
import { useState } from 'react';
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

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  );
}

export default App;

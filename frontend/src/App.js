import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import GlobalContext from './pages/GlobalContext';
import { RouterProvider } from 'react-router-dom';
import myrouter from './pages/LayoutRegUser';
import loginRouter from './pages/LayoutSignIn';

function App() {
  const [state, setState] = useState({  });

  return (
    <div>
      <GlobalContext.Provider value={{ state, setState }}>
        <RouterProvider router={myrouter} />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import GlobalContext from './context/GlobalContext';
import { RouterProvider } from 'react-router-dom';
import myrouter from './routes/LayoutRegUser';
import loginRouter from './routes/AuthRoutesSignin';

function App() {
  const [state, setState] = useState({  });

  return (
    <div>
      <GlobalContext.Provider value={{ state, setState }}>
        <RouterProvider router={loginRouter} />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;

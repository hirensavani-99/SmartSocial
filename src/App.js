import { useContext } from 'react';
import './App.css';
import Home from './pages/home/home'
import ProfilePage from './pages/ProfilePage/profilePage';
import Login from "./pages/LoginPage/LoginPage"
import Messanger from './pages/Messanger/Messanger';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import AuthContex from './store/auth-context';

function App() {
  const authctx = useContext(AuthContex)

  const isLoggedIn = authctx.isLogedIn;
  console.log(isLoggedIn);

  return (
    <div className="App">
      <Router>
        <Switch>
          {isLoggedIn && (<Route path="/feed">
            {isLoggedIn && <Home />}
            {!isLoggedIn && <Redirect to="/Auth" />}
          </Route>)}
          {isLoggedIn && (<Route path="/messages">
            {isLoggedIn && <Messanger />}
            {!isLoggedIn && <Redirect to="/Auth" />}
          </Route>)}
          {!isLoggedIn && (<Route exact path="/Auth">
            <Login />
          </Route>)}
          <Route path="/profile/:username">
            {isLoggedIn && <ProfilePage />}
            {!isLoggedIn && <Redirect to="/Auth" />}
          </Route>
          <Route path='*'>
            <Redirect to="/Auth" />
          </Route>

        </Switch>
      </Router>

    </div>
  );
}

export default App;

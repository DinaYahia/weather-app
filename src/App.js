import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import City from './pages/City';
import CityTemp from './pages/CityTemp';
import "./index.css";

class App extends React.Component {
  render() {
    console.log("app is rendering");
    return (
      <Router>
        <div id="App">
          <div className="nav-bar">
            <Link to="/">
              <button className="nav-btn">My cities</button>
            </Link>
            <Link to="/cityTemp">
              <button className="nav-btn">My City Temp</button>
            </Link>
          </div>

          <Switch>
            <Route path="/" exact>
              <City />
            </Route>
            <Route path="/cityTemp" exact>
              <CityTemp />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
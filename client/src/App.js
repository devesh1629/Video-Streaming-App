import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Home from './Home';
import Player from './Player';
// import PostVideo from './PostVideo';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/player/:id" component={Player}></Route>
        {/* <Route path="/postvideo" component={PostVideo}></Route> */}
      </Switch>
    </Router>
  );
}

export default App;

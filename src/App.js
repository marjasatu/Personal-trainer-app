import React from 'react'
import './App.css';
import TrainingsCalendar from './components/TrainingCalendar'
import Customers from './components/Customers'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import Event from '@material-ui/icons/Event';
import Tooltip from '@material-ui/core/Tooltip';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

function App() {


  return (
    <div className="App" >
      <Router>
      <AppBar position="static" >
        <Toolbar >
          <Typography variant="h6" style = {{display: 'flex', flexGrow: 1}}>
            Personal trainer app
          </Typography >
          <div >
          <Tooltip title="Training Calendar">
            <IconButton  href="/components/TrainingCalendar" color='inherit' >
              <Event />
            </IconButton >
          </Tooltip>
          <Tooltip title="Customers">
            <IconButton  href="/components/Customers" color='inherit' >
              <PeopleAlt />
            </IconButton>
          </Tooltip>
          </div>
          </Toolbar>
      </AppBar>
      <Switch>
          <Route path="/components/TrainingCalendar">
            <TrainingsCalendar  />
          </Route>
          <Route path="/components/Customers">
            <Customers />
          </Route>
          <Route path="/">
            <Customers />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

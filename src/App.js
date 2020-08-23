import React from 'react';
import MainPage from './components/MainPage';
import UserLists from './components/UserLists';
import './App.css';
import { Route, Switch } from 'react-router-dom';


class App extends React.Component{
  render(){
    return(
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route path="/list" component={UserLists}/>
        </Switch>
      </div>
    )
  }
}


export default App;

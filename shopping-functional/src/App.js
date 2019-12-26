import React from 'react';
import './App.css';
// import routing from './router'
import Routers from './Routers';
import NoRoute from './components/NoRoute';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { UserProvider } from './context/userContext';


class App extends React.Component {
  state = {
    login: false,
    validation: (val) =>{
      console.log(val);
      
      this.setState({
        login: val
      })
    }
  }
  render() {
    return (
      <>
        <UserProvider value={this.state}>
          <Router>
            <Routers />

          </Router>
        </UserProvider>
      </>
    );
  }
}



export default App;






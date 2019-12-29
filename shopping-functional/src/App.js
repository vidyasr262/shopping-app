import React from 'react';
import './App.css';
// import routing from './router'
import Routers from './Routers';
import NoRoute from './components/NoRoute';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { UserProvider } from './context/userContext';


class App extends React.Component {
  /* state = {
    login: false,
    add: false,
    validation: (val) =>{
      console.log(val);
      
      this.setState({
        login: val
      })
    }, */

    state = {
      login:false,
      userlogin:false,
      userLogin:(e)=>{
        this.setUserLogin(e)
      },
      setLogin: (val) => {
        this.setLogout(val)
      }
    }
  
    setLogout = (val) => {
      this.setState({
        ...this.state,
        login: val
      })
    }
  

    // product: (v) =>{
    //   this.setState({
    //   add: v
    //   })
    // }
  
    setUserLogin=(val)=>{
      this.setState({
        ...this.state,
        user: val
      })
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






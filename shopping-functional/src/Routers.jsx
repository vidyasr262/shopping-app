import React, { Component, useContext } from 'react'
import Home from './components/home/Home'
import ViewAccount from './components/viewAccount/ViewAccount'
import Register from './components/createAccount/Register'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/login/Login'
import UserContext, { UserConsumer } from './context/userContext';
import AddProducts from './components/addProduct/AddProducts'
import ShowProducts from './components/showProduct/ShowProducts'
import MyWishList from './components/myWishList/MyWishList'
import MyCartList from './components/myCart/MyCartList'
import MyProfile from './components/myProfile/MyProfile'
import './App.css';

export default function Routers(props) {
    const context = useContext(UserContext)

    let isTrue = localStorage.getItem("isTrue")

    let logout = (context) => {
        context.setLogin(false)
        // props.history.push('/')
        localStorage.clear()
    }
    return (
        <div>
            <div>
                <nav className="navbar navbar-expand-md bg-primary navbar-dark ">

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <h3 className="text-white px-2">Shopping App</h3>
                            </li>

                            <li className="nav-item">
                                <Link to='/' className="nav-link text-white">Home</Link>
                            </li>

                            <UserConsumer>
                                {
                                    (context) => {
                                        console.log("navigation ", context.login)
                                        if (isTrue === 'true') {

                                            if (context.userlogin) {
                                                console.log("navigation2 ", context.userlogin)

                                                return (
                                                    <>
                                                        <li className="nav-item">
                                                            <Link to='/myprofile' className="nav-link text-white px-3">My Profile</Link>
                                                        </li>

                                                        <li className="nav-item">
                                                            <Link to='/showproducts' className="nav-link text-white px-3">Show Products</Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to='/mywishlist' className="nav-link text-white px-3">My Wishlist</Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to='/mycartlist' className="nav-link text-white px-3">My Cart</Link>
                                                        </li>
                                                        {/* <div className="ml-auto d-flex"> */}
                                                        <li className="nav-item" style={{ position: "absolute", right: "2%" }}>
                                                            <Link to='/' onClick={() => logout(context)} className="nav-link text-warning"><strong>Logout</strong></Link>
                                                        </li>

                                                    </>
                                                )
                                            } else {
                                                return (
                                                    <>
                                                        <li className="nav-item">
                                                            <Link to='/myprofile' className="nav-link text-white px-3">My Profile</Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to='/addproducts' className="nav-link text-white px-3">Add Products</Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to='/showproducts' className="nav-link text-white px-3">Show Products</Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to='/mywishlist' className="nav-link text-white px-3">My Wishlist</Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to='/mycartlist' className="nav-link text-white px-3">My Cart</Link>
                                                        </li>
                                                        {/* <div className="ml-auto d-flex"> */}
                                                        <li className="nav-item" style={{ position: "absolute", right: "2%" }}>
                                                            <Link to='/' onClick={() => logout(context)} className="nav-link text-warning"><strong>Logout</strong></Link>
                                                        </li>

                                                    </>
                                                )
                                            }
                                        }
                                        else {
                                            return (
                                                <>
                                                    <li className="nav-item">
                                                        <Link to='/register' className="nav-link text-white">Register</Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link to='/login' className="nav-link text-white">Login</Link>
                                                    </li>
                                                </>
                                            )
                                        }

                                    }
                                }
                            </UserConsumer>
                        </ul>
                    </div>
                </nav>

            </div>

            {/* {context.login?  <>  
            <Route path='/viewaccount' component={ViewAccount} />
            <Route path='/addproducts' component={AddProducts} />
            <Route path='/showproducts' component={ShowProducts} />
            <Route path='/mycartlist' component={MyCartList} />
            <Route path='/mywishlist' component={MyWishList} />
            <Route path='/myprofile' component={MyProfile} />  </> :
       <>    <Route exact path='/' component={Home} />
             <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />  </>}

           
 */}


            {isTrue ? <>   <Route path='/viewaccount' component={ViewAccount} />
                <Route path='/addproducts' component={AddProducts} />
                <Route path='/showproducts' component={ShowProducts} />
                <Route path='/mycartlist' component={MyCartList} />
                <Route path='/mywishlist' component={MyWishList} />
                <Route path='/myprofile' component={MyProfile} />  </> : null}
            <Route exact path='/' component={Home} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />

            {/* </Router> */}


        </div>
    )

}

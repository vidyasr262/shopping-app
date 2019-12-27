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



export default function Routers() {
    const context = useContext(UserContext)
    return (
        <div>
            <div>
                <nav className="navbar navbar-expand-md bg-dark navbar-dark ">

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <Link to='/' className="nav-link text-white">Home</Link>
                            </li>

                            <UserConsumer>
                                {
                                    (context) => {
                                        if (context.login) {
                                            return (
                                                <>
                                                     <li className="nav-item">
                                                        <Link to='/myprofile' className="nav-link text-white">My Profile</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to='/addproducts' className="nav-link text-white">Add Products</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to='/showproducts' className="nav-link text-white">Show Products</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to='/mywishlist' className="nav-link text-white">My Wishlist</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to='/mycartlist' className="nav-link text-white">My Cart</Link>
                                                    </li>
                                                    <li className="nav-item ">
                                                        <Link to='/' onClick={() => context.validation(false)} className="nav-link text-white">Logout</Link>
                                                    </li>
                                                </>
                                            )
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
            {/* {context.login? <><Route exact path='/' component={Home} />
            <Route path='/viewaccount' component={ViewAccount} />
            <Route path='/addproducts' component={AddProducts} />
            <Route path='/showproducts' component={ShowProducts} /></>:
           <> <Route path='/register' component={Register} />
            <Route path='/login' component={Login} /></>} */}

         <Route exact path='/' component={Home} />
            <Route path='/viewaccount' component={ViewAccount} />
            <Route path='/addproducts' component={AddProducts} />
            <Route path='/showproducts' component={ShowProducts} />
            <Route path='/mycartlist' component={MyCartList} />
            <Route path='/mywishlist' component={MyWishList} />
            <Route path='/myprofile' component={MyProfile} />
           <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />

            {/* </Router> */}


        </div>
    )

}

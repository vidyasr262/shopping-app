import React, { useState, useContext } from 'react'
import UserContext from '../../context/userContext'
import Axios from 'axios';
import ProductContext, { ProductProvider } from '../../context/productContext';
import MyProfile from '../myProfile/MyProfile';


export default function Login(props) {
    const [emailId, setEmailId] = useState('')
    const [passWord, setPassWord] = useState('')
    const [showEmailId, setShowEmailId] = useState(false)
    const [showPassWord, setShowPassWord] = useState(false)

    // const [arr, setArr] = useState({array: []})
    const [arr, setArr] = useState()

 
    
const loginData = {
    emailId: emailId,
    passWord: passWord
}
let array=""

  const  handleSubmit = (event) => {
        event.preventDefault();
        // const { email, password } = loginData;

        const url = 'https://shopping-22a16.firebaseio.com/register.json'

        Axios.get(url).then((response) => {
             console.log("Response ", response)

            for (let key in response.data) {
                let account = response.data[key]
                console.log("account data ", account.emailId)
                console.log("name ", account.userName)
                console.log("current state ", emailId)

                if ((account.emailId === emailId) && (account.passWord === passWord)) {
                    console.log("success")
                    console.log("Account ", account.emailId)
                    array=account.emailId
                    setArr({
                        ...arr,
                        array:account
                    })
                     console.log("login ", arr)
                    props.history.push('/showproducts')
                      
                    context.validation(true)

                } else {
                    console.log("wrong")

                }
            }


        })
            .catch((err) => {
                console.log('Error ', err)
            })
    }



    const context = useContext(UserContext)
    return (

        <div>
{/* <ProductProvider value={arr}>
    <MyProfile  action="yu"/>
    </ProductProvider> */}
{/* <MyProfile  action="hel"/> */}

                <div className="col-md-4 col-sm-6 offset-md-4 offset-sm-4 mt-4 p-3 rounded" style={{ backgroundColor: "#27273c30" }}>
                    <h1 className="text-center">Login</h1>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Email address:</label>
                            <input type="text" className="form-control inputbox" placeholder="Enter email" name="emailId" value={emailId} onChange={(e) => { setEmailId(e.target.value) }} />
                            {/* {this.state.showEmailId ? <p style={unameStyle}>Invalid email id</p> : null} */}

                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" className="form-control inputbox" placeholder="Enter password" name="passWord" value={passWord} onChange={(e) => { setPassWord(e.target.value) }} />
                            {/* {this.state.showPassWord ? <p style={unameStyle}>Invalid password</p> : null} */}
                        </div>


                        <button onClick={() => { context.validation(true) }} type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>

    )
}

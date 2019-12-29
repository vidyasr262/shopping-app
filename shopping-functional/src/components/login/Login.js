import React, { useState, useContext } from 'react'
import UserContext from '../../context/userContext'
import Axios from 'axios';
// import ProductContext, { ProductProvider } from '../../context/productContext';


export default function Login(props) {
    const [emailId, setEmailId] = useState('')
    const [passWord, setPassWord] = useState('')

    const [emailIdErr, setEmailErr] = useState(false)
    const [passWordErr, setPasswordErr] = useState(false)
const [show, setshow] = useState(false)

    const loginData = {
        emailId: emailId,
        passWord: passWord
    }


    const validation = (event) => {
        const isValid = true

        event.preventDefault()
        if (emailId.trim().match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)) {
            setEmailErr(false)

        }
        else {
            setEmailErr(true)
            return isValid

        }
        
        if (passWord !== "") {
            setPasswordErr(false)

        }
        else {
            setPasswordErr(true)
            return isValid
        }
        checkFinally(isValid)
    }

    const checkFinally = (isValid) => {
        if (emailIdErr !== true && passWordErr !== true) {
            handleSubmit()

        }
    }

    const handleSubmit = async (event) => {
        // event.preventDefault();
        // const { email, password } = loginData;

        const url = 'https://shopping-22a16.firebaseio.com/register.json'

        await Axios.get(url).then((response) => {
            console.log("Response ", response)

            for (let key in response.data) {
                let account = response.data[key]
                console.log("account data ", account.emailId)
                console.log("current state ", emailId)

                if ((account.emailId === emailId) && (account.passWord === passWord)) {
                    console.log("success")
                    console.log("Account ", account)

                    localStorage.setItem('document', JSON.stringify(account));

                    if (account.role === 'user') {
                        console.log("user ")
                        props.history.push('/showproducts')
                        context.userLogin(true)
                        context.setLogin(true)
                    } else {
                        console.log("admin")
                        props.history.push('/showproducts')
                        context.setLogin(true)
                        context.userLogin(false)
                    }

                    // console.log("login ", arr)

                    //  props.history.push('/showproducts')
                    // // props.history.push('/')
                    // context.setLogin(true)


                } else {
                    console.log("wrong")
                    setshow(true)
                    // props.history.push('/login')
                    // context.setLogin(false)
                }
            }


        })
            .catch((err) => {
                console.log('Error ', err)
            })
    }



    const context = useContext(UserContext)

    const unameStyle = {
        color: 'red',
        fontSize: '13px'
    }
    const valid = {
        margin: '10px auto',
        width: '200px',
        background:' #ff000073',
        textAlign: 'center',
        fontSize: '20px',
        padding: '8px'
    }
    return (

        <div>
           {show?<div style={valid}>Invalid Login</div>: null}
            <div className="col-md-4 col-sm-6 offset-md-4 offset-sm-4 mt-4 p-3 rounded" style={{ backgroundColor: "#fff" }}>
                <h1 className="text-center">Login</h1>

                <form onSubmit={validation}>

                    <div className="form-group">
                        <label>Email address:</label>
                        <input type="text" className="form-control inputbox" placeholder="Enter email" name="emailId" value={emailId} onChange={(e) => { setEmailId(e.target.value) }} />
                        {/* {showEmailId ? <p style={unameStyle}>Invalid!! enter your emailId</p> : null} */}
                        {emailIdErr ? <p style={unameStyle}>Invalid!! enter your emailId</p> : null}


                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control inputbox" placeholder="Enter password" name="passWord" value={passWord} onChange={(e) => { setPassWord(e.target.value) }} />
                        {/* {showPassWord ? <p style={unameStyle}>Invalid!! enter your password</p> : null} */}
                        {passWordErr ? <p style={unameStyle}>Invalid!! enter your passWord</p> : null}

                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
           
        </div>

    )
}

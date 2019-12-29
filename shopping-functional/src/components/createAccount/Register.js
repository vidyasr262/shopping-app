import React, { useState } from 'react'
import Axios from 'axios';


export default function Register(props) {
    const [userName, setUserName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [passWord, setPassWord] = useState('')
    const [cPassWord, setCpassWord] = useState('')
    const [gender, setGender] = useState('')
    const [role, setRole] = useState('')

    const [userNameErr, setUserNameErr] = useState(false)
    const [emailIdErr, setEmailIdErr] = useState(false)
    const [phoneNumberErr, setPhoneNumberErr] = useState(false)
    const [passWordErr, setPassWordErr] = useState(false)
    const [cPassWordErr, setCpassWordErr] = useState(false)

    const [genderErr, setGenderErr] = useState(false)
    const [roleErr, setRoleErr] = useState(false)

    const allData = {
        userName: userName,
        emailId: emailId,
        phoneNumber: phoneNumber,
        passWord: passWord,
        cPassWord: cPassWord,
        gender: gender,
        role: role

    }


    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = true

        if (userName.trim().match(/^[a-zA-Z ]*$/) && userName !== '') {
            setUserNameErr(false)
        }
        else {
            setUserNameErr(true)
            return isValid

        }

        if (emailId.trim().match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)) {
            setEmailIdErr(false)

        }
        else {
            setEmailIdErr(true)
            return isValid

        }

        if (phoneNumber.trim().match(/^[0-9]{10}$/)) {
            setPhoneNumberErr(false)
        }
        else {
            setPhoneNumberErr(true)
            return isValid

        }

        if (passWord.match(/^.*(?=.{5,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/) && passWord !== "") {
            setPassWordErr(false)

        }
        else {
            setPassWordErr(true)
            return isValid

        }

        if (passWord === cPassWord) {
            setCpassWordErr(false)
        }
        else{
            setCpassWordErr(true)
            return isValid
        }


        if (role !== '') {
            setRoleErr(false)
        }
        else {
            setRoleErr(true)
            return isValid

        }

        if (gender !== '') {
            setGenderErr(false)
        }
        else {
            setGenderErr(true)
            return isValid

        }

        checkValid(isValid)
    }

    const checkValid = (isValid) => {
        if (userNameErr !== true && emailIdErr !== true && phoneNumberErr !== true && passWordErr !== true && genderErr !== true && roleErr !== true) {
            saveData()
        }
    }



    const saveData = (event) => {
        // event.preventDefault();
        console.log("Form data ", allData)

        const formData = allData;
        const url = 'https://shopping-22a16.firebaseio.com/register.json'

        Axios.post(url, formData)
            .then((response) => {
                console.log("Success ", response)

                if (response.status === 200) {
                    //Navigate propgramatically
                    props.history.push('/login')
                }
            }).catch((err) => {
                console.log("Error message ", err)
            })
    }


    const unameStyle = {
        color: 'red',
        fontSize: '13px'
    }

    return (

        <div>
            <div className="col-md-4 offset-md-4 mt-4 p-3 rounded shadow" style={{ backgroundColor: "#fff" }}>
                <h2 className="text-center pb-3">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" className="form-control inputbox" placeholder="Enter username" name="userName" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                        {userNameErr ? <p style={unameStyle}>Invalid! Fill valid username</p> : null}

                    </div>
                    <div className="form-group">
                        <label>Email address:</label>
                        <input type="text" className="form-control inputbox" placeholder="Enter email" name="emailId" value={emailId} onChange={(e) => { setEmailId(e.target.value) }} />
                        {emailIdErr ? <p style={unameStyle}>Invalid!. Email format should be  ex: example@xxx.xxx</p> : null}

                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control inputbox" placeholder="Enter password" name="passWord" value={passWord} onChange={(e) => { setPassWord(e.target.value) }} />
                        {passWordErr ? <p style={unameStyle}>Password should contain minimum 5 characters and one Uppercase, one Lowercase, one special character, one Number</p> : null}{phoneNumberErr ? <p style={{ color: 'red', fontSize: '12px' }}>Enter valid Mobile Number</p> : null}

                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input type="password" className="form-control inputbox" placeholder="Enter confirm password" name="cPassWord" value={cPassWord} onChange={(e) => { setCpassWord(e.target.value) }} />
                        {cPassWordErr ? <p style={unameStyle}>Password Should be Match</p> : null}

                    </div>
                    <div className="form-group">
                        <label>Phone number:</label>
                        <input type="number" className="form-control inputbox" placeholder="Enter phone number" name="phoneNumber" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                        {phoneNumberErr ? <p style={unameStyle}>Enter valid Mobile Number</p> : null}

                    </div>

                    <div className="form-group">
                        <label>Role:</label>
                        <select name="select" onChange={(e)=>setRole(e.target.value)} className="form-control inputbox">
                            <option value="">---Select One Role ---</option>
                            <option value="user" >User</option>
                            <option value="admin">Admin</option>
                        </select>
                        {roleErr ? <p style={unameStyle}>Select any one Role</p> : null}
                    </div>

                    

                    <div className="form-group">
                        <label>Gender:</label>
                        <input type="radio" name="gender" className="ml-4"  value="male" onChange={(e)=>setGender(e.target.value)} /> Male
                        <input type="radio" name="gender" className="ml-4" value="female" onChange={(e)=>setGender(e.target.value)}  /> Female
                        <input type="radio" name="gender" className="ml-4" value="other" onChange={(e)=>setGender(e.target.value)}  /> Other
                        {genderErr ? <p style={unameStyle}>Select Gender</p> : null}
                   </div>
                    

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>

    )
}

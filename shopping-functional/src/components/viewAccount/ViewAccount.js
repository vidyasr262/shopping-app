import React from 'react'
import Axios from 'axios'
import { Button, Modal } from 'react-bootstrap'

class ViewAccount extends React.Component {

  state = {
    account: [],
    show: false,
    userName: '',
    emailId: '',
    phoneNumber: '',
    passWord: '',

    update: []
  }
  componentDidMount() {
    this.getAllAccounts();
  }

  getAllAccounts = () => {
    const url = 'https://react-employee-9f05c.firebaseio.com/accounts.json'
    Axios.get(url).then((response) => {
      console.log("Response ", response)

      let fetchAccount = []
      for (let key in response.data) {
        let account = response.data[key]
        fetchAccount.push({
          ...account,
          id: key
          //  email: account.emailId,
          //  username: account.userName,
          //  phone: account.phoneNumber,
          //  password: account.passWord
        }
        )
        console.log("account ", account)
        console.log("Fetch account ", fetchAccount)
        this.setState({
          account: fetchAccount
        })
      }


    })
      .catch((err) => {
        console.log('Error ', err)
      })

  }

  async deleAccount(accToDelete) {
    console.log(accToDelete)
    const id = accToDelete.id;
    const url = 'https://react-employee-9f05c.firebaseio.com/accounts/' + id + '/.json'

    try {
      const response = await Axios.delete(url)

      const myAccounts = [...this.state.account]           // In UI for deleting
      const index = myAccounts.indexOf(accToDelete)
      myAccounts.splice(index, 1)
      this.setState({
        account: myAccounts
      })

      //Unless, until it is required to do make unnecessary calls to server  // for deleting
      //this.getAllAccount()

      console.log("Response ", response)
    } catch (error) {
      console.log('Error ', error)
    }
  }

  handleClose = () => {

    this.setState({
      show: !this.state.show

    })
  }

  handleShow = (acctoEdit) => {
    console.log("Account to be edited ", acctoEdit)
    this.setState({
      show: !this.state.show,
      ...acctoEdit
    })
  }

  handlChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  saveData = async () => {
    console.log("State data ", this.state)
    const { userName, emailId, phoneNumber, passWord, id } = this.state
    const accToUpdate = { userName, emailId, phoneNumber, passWord }
    const url = `https://react-employee-9f05c.firebaseio.com/accounts/${this.state.id}/.json`
    try {
      const response = await Axios.put(url, accToUpdate)
      console.log("Response ", response)

      if (response.status === 200) {
        console.log("my ", accToUpdate)

        this.handleClose();
        // this.getAllAccounts();    don't use for displaying in UI

        //First solution 
         const updateAccounts = [...this.state.account]
        // for(let i in updateAccounts) {
        //   if(updateAccounts[i].id === this.state.id){
        //     updateAccounts[i].name = userName;
        //     updateAccounts[i].emailId =  emailId;
        //     updateAccounts[i].phoneNumber = phoneNumber;
        //     updateAccounts[i].passWord = passWord;
        //     break;
        //   }
        // }

        const acc = updateAccounts.map(acc => {
          if(acc.id === this.state.id){
                acc.userName = userName;
                acc.emailId =  emailId;
                acc.phoneNumber = phoneNumber;
                acc.passWord = passWord;
                return acc
          }
          return acc
        })
        console.log("Accounts ", acc)
          this.setState({
            account: acc
          })
      }
    } catch (err) {
      console.log('Error', err)
    }
  }


  render() {

    return (
      <div>
        <div className="container my-4">
          <table class="table">
            <thead className="thead-light">
              <tr>
                <th>UserName</th>
                <th>Email</th>
                <th>Phone no.</th>
                <th>Delete</th>
                <th>Edit</th>

              </tr>
            </thead>
            <tbody>

              {this.state.account.map((val) => {
                return (
                  <tr key={val.id}>
                    <td>{val.userName}</td>
                    <td>{val.emailId}</td>
                    <td>{val.phoneNumber}</td>
                    <td> <button className="btn bg-danger" onClick={() => this.deleAccount(val)}>Delete</button></td>

                    <td> <button className="btn bg-success" onClick={() => this.handleShow(val)}>Edit</button></td>
                  </tr>
                )
              })}


            </tbody>
          </table>

         

          <Modal show={this.state.show} onHide={() => this.handleShow()}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.saveData}>
                <div className="form-group">
                  <label>Username:</label>
                  <input type="text" className="form-control inputbox" placeholder="Enter username" name="userName" value={this.state.userName} onChange={this.handlChange} />


                </div>
                <div className="form-group">
                  <label>Email address:</label>
                  <input type="text" className="form-control inputbox" placeholder="Enter email" name="emailId" value={this.state.emailId} onChange={this.handlChange} />

                </div>
                <div className="form-group">
                  <label>Phone number:</label>
                  <input type="number" className="form-control inputbox" placeholder="Enter phone number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handlChange} />


                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" className="form-control inputbox" placeholder="Enter password" name="passWord" value={this.state.passWord} onChange={this.handlChange} />


                </div>

                {/* <button type="submit" className="btn btn-primary">Submit</button> */}
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.handleClose()}>
                Close
          </Button>
              <Button variant="primary" onClick={() => this.saveData()}>
                Save Changes
          </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    )
  }
}

export default ViewAccount
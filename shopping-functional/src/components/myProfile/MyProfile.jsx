import React, { Component } from 'react'

export default class MyProfile extends Component {
    constructor(props) {
        super(props);
        let comments = JSON.parse(localStorage.getItem('document'));
        this.state = {
            comments: comments
        };

        console.log("all data", comments.emailId)
        console.log("all ", this.state)

    }


    //     componentDidMount() {
    //    const documentData = JSON.parse(localStorage.getItem('document'));
    //   console.log("local ",documentData)
    //     }    


    render() {

        const { comments } = this.state
        return (
            <div>
                {/* {comments.emailId} <br />
                {comments.userName}<br />
                {comments.passWord}
                {comments.roll} */}

                <div className="card my-4" style={{width:'400px', margin:'auto'}}>
                    <div className="text-center">
                    <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuOgSkERO1_zoMpfFKwNiXIHN65dalXb1_i3Y0n6sLNAuouSLDuA&s" alt="Card image" style={{width:'100px', textAlign: 'center'}}/>
                       </div>
                        <div className="card-body text-center">
                            <h4 className="card-title text-center">Name: {comments.userName}</h4>
                            <p className="card-text"><strong>Email id: </strong>{comments.emailId}</p>
                            <p className="card-text"><strong>Phone number:</strong> {comments.phoneNumber}</p>
                        
                        </div>
                    </div>
                </div>
                
                )
            }
        }

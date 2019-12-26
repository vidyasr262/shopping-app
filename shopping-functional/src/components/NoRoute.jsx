import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

 class NoRoute extends Component {
    //  componentDidMount() {
    //      console.log("No Route comp props ", this.props)
    //  }

     navigateProgramatically = ()=> {
         console.log("Props object ", this.props)
         this.props.history.push('/')
     }
     
    render() {
        return (
            <div>

                <button onClick={this.navigateProgramatically}
                style={{position: 'fixed', bottom: '10%', left:'50%', right: 0, color: 'blue'}}> Home page</button>
            </div>
        )
    }
}


export default withRouter(NoRoute)

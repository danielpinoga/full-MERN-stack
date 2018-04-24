import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import axios from 'axios'

class LogIn extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    this.getAllUsers()
  }

  getAllUsers = () => {
    axios.get('localhost:3001/api/users').then(res => {
      this.setState({ users: res.data })
    })
  }

  render() {
    return (
      <div>
        <h1>Log-In</h1>
        <h3>Please Select an Existing User</h3>
        {this.state.users.map(user => {
          return (<Link to={`/user/${user._id}`}>{user.userName}</Link>)
        })}

        <div>
          <Link to='/'>Go Back Home</Link>
        </div>
      </div>
    )
  }
}

export default LogIn
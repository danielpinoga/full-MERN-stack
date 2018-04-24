import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class LogIn extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    this.getAllUsers()
  }

  getAllUsers = () => {
    axios.get('/api/users').then(res => {
      console.log("Got users", res.data)
      this.setState({ users: res.data })
    })
  }

  createUser = () => {
    axios.post('/api/users', {
      user: this.state.user
    }).then((res) => {
      this.setState({ redirectToHome: true, createdUser: res.data })
    })
  }

  handleChange = (e) => {
    const user = { ...this.state.user }
    user[e.target.name] = e.target.value
    this.setState({ user })
  }

  handleSignUp = (e) => {
    e.preventDefault()
    this.createUser()
  }

  render() {
    const usersLinks = this.state.users.map((user, i) => {
      console.log(user, i)
      return (<div key={i}><Link to={`/user/${user._id}`}> {user.name} </Link></div>)
    })
    console.log("USERLINKS", usersLinks)
    return (
      <div>
        <h1>Log-In</h1>
        <h3>Please Select an Existing User</h3>
        {usersLinks}

        <h1>Sign-Up</h1>
        <form onSubmit={this.handleSignUp}>
          <div>
            <label htmlFor="name">User Name</label>
            <input onChange={this.handleChange} name="name" type="text" value={this.state.name} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input onChange={this.handleChange} name="password" type="text" value={this.state.password} />
          </div>
          <button>Sign Up</button>
        </form>

        <div>
          <Link to='/'>Go Back Home</Link>
        </div>
      </div>
    )
  }
}

export default LogIn
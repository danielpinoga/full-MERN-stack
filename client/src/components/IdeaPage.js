import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

class IdeaView extends Component {
  state = {
    user: {
      name: 'Bob'
    },
    ideas: [{
      id: 1,
      title: 'hello',
      description: 'world'
    }, {
      id: 2,
      title: 'hola',
      description: 'mundo'
    }, {
      id: 3,
      title: 'goodnight',
      description: 'moon'
    }, {
      id: 4,
      title: 'greetings',
      description: 'earthlings'
    }]
  }

  componentDidMount() {
    if (this.props.match.params) {
      const { userId } = this.props.match.params
      axios.get(`/api/users/${userId}`).then(res => {
        const user = {
          _id: res.data._id,
          userName: res.data.userName
        }
        const ideas = res.data.ideas
        this.setState({ user, ideas })
      })
    }
  }

  handleChange = (e) => {
    const user = { ...this.state.user }
    user[e.target.name] = e.target.value
    this.setState({ user })
  }

  render() {
    const ideas = this.state.ideas.map((idea, i) => {
      return (
        <div key={i}>
          <input type="text" name="title" value={idea.title} onChange={this.handleChange} />
          <textarea name="description" value={idea.description} onChange={this.handleChange} />
          <button>Delete Idea</button>
        </div>
      )
    })
    return (
      <div>
        <div>
          <h1>{this.state.user.name}'s Idea Board</h1>
          <button onClick={this.createIdea}>New Idea</button>
        </div>
        <div>
          {ideas}
        </div>
      </div>
    )
  }
}

export default IdeaView
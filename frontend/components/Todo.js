import React from 'react'

export default class Todo extends React.Component {
  handleToggle = () => {
    this.props.onToggleComplete(this.props.todo.id);
  };

  render() {
    return (
      <li>
        <input
          type='text'
          checked={this.props.todo.completed}
          onChange={this.handleToggle}
        />
      </li>
    )
  }
}

import React from 'react'

export default class Form extends React.Component {
  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.props.inputValue.trim()) {
      this.props.onAddTodo(this.props.inputValue);
    }
  };

  handleInputChange = (event) => {
    this.props.onInputChange(event);
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          type='text'
          placeholder='Add new todo'
          value={this.props.inputValue}
          onChange={this.handleInputChange}
        />
        <button type='submit'>Add Todo</button>
        <button type='button' onClick={this.props.onClearCompleted}>Clear Completed</button>
      </form>
    )
  }
}

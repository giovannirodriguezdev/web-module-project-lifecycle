import React from 'react'
import Todo from './Todo';

export default class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            onToggleComplete={this.props.onToggleComplete}
          />
        ))}
      </ul>
    )
  }
}

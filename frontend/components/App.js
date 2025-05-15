import React from 'react'
import TodoList from './TodoList';
import Form from './Form';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputValue: '',
    }
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ todos: res.data })
      })
      .catch(err => {
        console.error('Error fetching todos:', err)
      })
  }

  addTodo = (name) => {
    axios.post(URL, { name })
      .then(res => {
        this.setState(prevState => ({
          todos: [...prevState.todos, res.data],
          inputValue: '',
        }));
      })
      .catch(err => {
        console.error('Error adding todo:', err);
      });
  };

  toggleComplete = (id) => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState(prevState => ({
          todos: prevState.todos.map(todo =>
            todo.id === id ? res.data : todo
          ),
        }));
      })
      .catch(err => {
        console.error("Error toggling todo:", err);
      });
  };

  handleFilterCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  render() {
    return (
      <div>
        <Form
          inputValue={this.state.inputValue}
          onInputChange={this.handleInputChange}
          onAddTodo={this.addTodo}
          onClearCompleted={this.handleFilterCompleted}
        />
        <TodoList
          todos={this.state.todos}
          onToggleComplete={this.toggleComplete}
        />
      </div>
    )
  }
}

import React from 'react'
import TodoList from './TodoList';
import Form from './Form';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      error: '',
      todoNameInput: '',
    }
  }

  onTodoNameInputChange = evt => {
    const { value } = evt.target
    this.setState({...this.state, todoNameInput: value})
  }

  resetForm = () => this.setState({...this.state, todoNameInput: ''});

  setAxiosResponseError = err => this.setState({ ...this.state, error: err.response.data.message})

  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
      .then(res => {
        this.fetchTodos();
        this.resetForm();
      })
      .catch(this.setAxiosResponseError)
  }

  onTodoFormSubmit = evt => {
    evt.preventDefault();
    this.postNewTodo()
  }

  fetchTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(this.setAxiosResponseError)
  }

  componentDidMount() {
    this.fetchTodos();
  }


  render() {
    return (
      <div>
        <div id='error'>{this.state.error}</div>
        <h2>Todos:</h2>
        {
          this.state.todos.map(td => {
            return <div key={td.id}>{td.name}</div>
          })
        }
        <form id="todoForm" onSubmit={this.onTodoFormSubmit}>
          <input
            value={this.state.todoNameInput}
            onChange={this.onTodoNameInputChange}
            type='text'
            placeholder='Type todo'
          />
          <input type='submit'></input>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}

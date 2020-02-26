import { Component, renderToDOM } from './ui-lib.js'
import { h } from './index.js'
import { data } from './data.js'

const createTodoList = ({ id, userId, title, completed, onClick }) => h('div', { style: 'border: 1px solid black; width: 300px; padding: 10px;' }, [
  h('p', {}, `userId: ${userId}`),
  h('p', {}, `Title: ${title}`),
  h('p', {}, `Completed ${JSON.stringify(completed)}`),
  h('button', { onclick: (e) =>  onClick(userId, id) }, 'Toggle complete status')
])

class App extends Component {
	constructor() {
    super()
    
    this.state = {
      data
    }
	}

	render = () => h('div', {}, [
    ...data.map((props) => createTodoList({ ...props, onClick: this.onClick }))
  ])

  onClick = (userId, todoId) => {
    const data = [...this.state.data]

    const todo = data.find((todo) => todo.id === todoId && todo.userId === userId)

    todo.completed = !todo.completed

    this.setState({ data })
  }
}

renderToDOM('app', App)
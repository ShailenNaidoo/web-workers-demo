class App extends Component {
	constructor() {
    super()
    
    this.state = {
      isTruthy: false
    }
	}

	render = () => {
  	return h('div', {}, [
      h('p', { onclick: this.click }, `This is cool ${!this.state.isTruthy}`),
      h('p', { onclick: this.click }, `This is not cool ${this.state.isTruthy}`),
      h('p', {}, 'I don\'t change')
    ])
  }
  
  click = (e) => {
  	this.setState({
      isTruthy: !this.state.isTruthy
    })
  }
}

renderToDOM('app', App)
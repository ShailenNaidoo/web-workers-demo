class App extends Component {
	constructor() {
    super()
    
    this.state = {
      text: ''
    }
	}

	render = () => h('div', {}, [
    h('input', { oninput: this.onInput }, ''),
    h('p', {}, this.state.text)
  ])

  onInput = (e) => {
    this.setState({ text: e.target.value })
  }
}

renderToDOM('app', App)
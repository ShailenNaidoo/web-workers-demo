import { renderNodes } from '/vdom.js'
import { applyDiff, diff } from '/diff.js'

class Component {  
  setState = (newState) => {
  	this.state = {
      ...this.state,
      ...newState
    }
  }
}

const renderToDOM = (sel, App) => {
	const el = document.getElementById(sel)
  const app = new App()

  let oldVDOM = app.render()
  let newVDOM = {}

  console.log(oldVDOM)
  
  const { setState } = app
  
  app.setState = (...args) => {
    setState(...args)

    newVDOM = app.render()

    applyDiff(diff(oldVDOM, newVDOM), el)

    oldVDOM = newVDOM
  }

  el.appendChild(renderNodes(oldVDOM))
}

export {
  renderToDOM,
  Component
}
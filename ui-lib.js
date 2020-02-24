import { renderNodes } from './vdom.js'
import { applyDiff, diff } from './diff.js'

const worker = new Worker('/worker.js', { type: 'module' })

function getDiffFromWorker(VDOMs) {
  worker.postMessage(JSON.stringify(VDOMs))
  
  return new Promise((resolve, reject) => {
    worker.addEventListener('message', (e) => resolve(e.data))
    worker.addEventListener('error', (e) => reject(e))
  })  
} 

class Component {  
  setState = (newState) => {
  	this.state = {
      ...this.state,
      ...newState
    }
  }
}

function renderToDOM(sel, App) {
	const el = document.getElementById(sel)
  const app = new App()

  let oldVDOM = app.render()
  let newVDOM = {}

  const { setState } = app
  
  app.setState = async (...args) => {
    setState(...args)

    newVDOM = app.render()

    const diffs = await getDiffFromWorker({ oldVDOM, newVDOM })

    applyDiff(diffs, el)

    oldVDOM = newVDOM
  }

  el.appendChild(renderNodes(oldVDOM))
}

export {
  renderToDOM,
  Component
}
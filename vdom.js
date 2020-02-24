const h = (nodeName, attributes, children) => ({
  nodeName,
  attributes: {
  	...attributes,
    'data-tag': window.randomId(10, 'aA0'),
  },
  children
})

const renderNodes = (vNode) => {
  const el = document.createElement(vNode.nodeName)

  for (const [key, value] of Object.entries(vNode.attributes)) {
  	if (typeof value === 'function') {
			el[key] = value
		} else {
      el.setAttribute(key, value)
    }
  }

  if (Array.isArray(vNode.children)) {
    vNode.children.forEach((child) => {
      el.appendChild(renderNodes(child))
    })
  }
  
  if (typeof vNode.children === 'string') {
		el.innerText = vNode.children
	}

  return el
}

const renderToDOM = (sel, App) => {
	const el = document.getElementById(sel)
  const app = new App()
  const vDOM = app.render()
  let newVDOM = {}
  
  const { setState } = app
  
  app.setState = (...args) => {
    setState(...args)

    newVDOM = app.render()

    el.innerHTML = ''
    el.appendChild(renderNodes(newVDOM))
  }

  el.appendChild(renderNodes(vDOM))
}

class Component {  
  setState = (newState) => {
  	this.state = {
      ...this.state,
      ...newState
    }
  }
}

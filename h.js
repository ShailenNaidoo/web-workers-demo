const h = (nodeName, attributes, children) => {
  const id = window.randomId(10, 'aA0')

  return {
    id,
    nodeName,
    attributes: {
      ...attributes,
      'data-tag': id,
    },
    children
  }
}

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
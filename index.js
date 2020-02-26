

function h(nodeName, attributes = {}, children) {
  const id = window.randomId(10, 'aA0')

  return () => ({
    id,
    nodeName,
    attributes: {
      ...attributes,
      'data-tag': id,
    },
    children
  })
}

function createVNodeInstance(vNodeClosure) {
  const vNode = vNodeClosure()

  if (Array.isArray(vNode.children)) {
    const vNodes = []

    for (const child of vNode.children) {
      vNodes.push({
        vNodeClosure,
        ...createVNodeInstance(child)
      })
    }

    vNode.children = vNodes
  }

  return {
    vNodeClosure,
    ...vNode
  }
}

function diff(oldNode, newNode) {
  const { children: oldChildren } = oldNode
  const { children: newChildren } = newNode

  if (Array.isArray(oldChildren) && Array.isArray(newChildren)) {
    const diffs = []

    oldChildren.forEach((oldChild, index) => {
      const { vNodeClosure, ...rest} = oldChild

      const newChild = newChildren[index]

      newChild.vNodeClosure = vNodeClosure

      const resultOfDiff = diff(oldChild, newChild)

      if(resultOfDiff) {
        diffs.push(resultOfDiff)
      }
    })

    return diffs
  }

  if (oldChildren !== newChildren) {
    return {
      ...newNode,
      id: oldNode.id
    }
  }
}

function renderNodes(vNode) {
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

function applyDiff(diffs, root) {
  for (const diff of diffs) {
    if (Array.isArray(diff)) {
      return applyDiff(diff, root)
    }

    const { id } = diff.vNodeClosure()

    diff.id = id

    diff.attributes = {
      ...diff.attributes,
      'data-tag': id
    }

    root.querySelector(`[data-tag="${id}"]`).replaceWith(renderNodes(diff))
  }
}

export {
  h,
  createVNodeInstance,
  diff,
  renderNodes,
  applyDiff
}
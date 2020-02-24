import { renderNodes } from './vdom.js'

function diff(oldNode, newNode) {
  const { children: oldChildren } = oldNode
  const { children: newChildren } = newNode

  if (Array.isArray(oldChildren) && Array.isArray(newChildren)) {
    const diffs = []

    oldChildren.forEach((child, index) => {
      const resultOfDiff = diff(child, newChildren[index])

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

function applyDiff(diffs, root) {
  for (const diff of diffs) {
    if (Array.isArray(diff)) {
      return applyDiff(diff)
    }

    root.querySelector(`[data-tag="${diff.id}"]`).replaceWith(renderNodes(diff))
  }
}

export {
  diff,
  applyDiff,
}

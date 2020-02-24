// const oldVDOM = {
//   id: 1,
//   nodeName: 'p',
//   attributes: {},
//   children: [
//     {
//       id: 2,
//       nodeName: 'p',
//       attributes: {},
//       children: 'Hello World'
//     },
//     {
//       id: 3,
//       nodeName: 'p',
//       attributes: {},
//       children: [
//         {
//           id: 4,
//           nodeName: 'p',
//           attributes: {},
//           children: [
//             {
//               id: 5,
//               nodeName: 'p',
//               attributes: {},
//               children: 'World Hello'
//             },
//           ]
//         },
//       ]
//     }
//   ]
// }

// const newVDOM = {
//   ...oldVDOM,
//   children: [
//     {
//       id: 2,
//       nodeName: 'p',
//       attributes: {},
//       children: 'Hello World Hello'
//     },
//     {
//       id: 3,
//       nodeName: 'p',
//       attributes: {},
//       children: [
//         {
//           id: 4,
//           nodeName: 'p',
//           attributes: {},
//           children: [
//             {
//               id: 5,
//               nodeName: 'p',
//               attributes: {},
//               children: 'Wold Hello'
//             },
//           ]
//         },
//       ]
//     }
//   ]
// }

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

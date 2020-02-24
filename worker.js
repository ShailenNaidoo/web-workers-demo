import { diff } from './diff.js'

self.addEventListener('message', (e) => {
  const { oldVDOM, newVDOM } = JSON.parse(e.data)

  self.postMessage(diff(oldVDOM, newVDOM))
})

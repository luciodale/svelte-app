import './app.css'
import App from './App.svelte'

// if (process.env.NODE_ENV === 'development') {
//   const { worker } = await import('./mocks/browser')
//   worker.start()
// }

const app = new App({
  target: document.getElementById('app')
})

export default app

const express = require('express')

const app = express()
const PORT = 5050

const data = ['Hello', 'World']

app.use(express.json())

app.get('/api/data', (req, res) => {
  return res.json(data)
})

app.post('/api/data', async (req, res) => {
  const { text } = req.body
  data.push(text)
  const pause = await new Promise((resolve) => {
    setTimeout(() => {
      return res.json('OK')
    }, 5000)
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

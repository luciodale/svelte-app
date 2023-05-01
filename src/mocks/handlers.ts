import { rest } from 'msw'

const data: string[] = ['1', '2', '3', '4']

export const handlers = [
  rest.get('/api/data', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data))
  }),
  rest.post('/api/data', async (req, res, ctx) => {
    const { text } = await req.json()
    data.push(text)
    return res(ctx.status(200), ctx.json('OK'))
  })
]

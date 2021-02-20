import { rest } from 'msw';

export const handlers = rest.get('/songs', (req, res, ctx) => {
  return res(ctx.json({ name: 'Beaver Creek' }));
});

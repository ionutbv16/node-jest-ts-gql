import { createAppServer } from './methods';

process.nextTick(async () => {
  const { httpServer } = await createAppServer();

  httpServer.listen(3000, () => {
    console.log(`server started on 3000.`)
  })
});

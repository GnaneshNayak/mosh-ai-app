import concurrently from 'concurrently';

concurrently([
   {
      name: 'server',
      command: 'bun run dev',
      prefixColor: 'blue',
      cwd: 'packages/server',
   },
   {
      name: 'client',
      command: 'bun run dev',
      prefixColor: 'green',
      cwd: 'packages/client',
   },
]);

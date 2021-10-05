import path from 'path';
import { Command } from 'commander';
import { serve } from '@codesheet/server';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  // [filename] - optional value
  .command('serve [filename]')
  .description('Open a file for editing')
  // <number> - required value
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'codesheet.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
      );
    } catch (err: any) {
      if (err.code === 'EADDRINUSE') {
        console.error('Port is in use. Try running on a different port.');
      } else {
        console.log(err.message);
      }
      process.exit(1);
    }
  });

import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { startupContent } from '../data';

interface Cell {
  id: string;
  content: string;
  type: 'code' | 'text';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());
  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

      res.send(JSON.parse(result));
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        if (filename === 'codesheet.js') {
          await fs.writeFile(fullPath, JSON.stringify(startupContent), 'utf-8');
          res.send(startupContent);
        } else {
          await fs.writeFile(fullPath, '[]', 'utf-8');
          res.send([]);
        }
      } else {
        throw err;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;

    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok' });
  });

  return router;
};

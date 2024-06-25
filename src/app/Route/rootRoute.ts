import { Request, Response } from 'express';
const rootRoute = (req: Request, res: Response) => {
  res.send('Welcome to the Home Page!');
};

export default rootRoute;

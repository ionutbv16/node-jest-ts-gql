

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';


export async function getToken(request: Request, response: Response): Promise<void> {


  const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
  response.status(200).send({
    token,
  });

}
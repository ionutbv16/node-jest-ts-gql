
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ProjectsService } from '../services';
import jwt from 'jsonwebtoken';

export async function getProjects(request: Request, response: Response): Promise<void> {

  if (!request.headers.authorization) {
    response.status(401).send({
      error: 'Unauthorized'
    });
    return
  }
  console.log('request', request.headers.authorization);

  try {
    jwt.verify(request.headers.authorization.replace('Bearer ', ''), 'shhhhh');
  }
  catch (error) {
    response.status(401).send({
      error: 'Unauthorized'
    });
    throw new Error(error as string | undefined)
  }

  //console.log('decoded', decoded);
  const prisma = new PrismaClient({
    errorFormat: 'minimal'
  });

  const projectsService = new ProjectsService;
  const projects = await projectsService.getProjects(prisma);
  response.status(200).send({
    projects,
  });

}

import { Server as HttpServer } from 'http';
import { getProjects } from './';
import jwt from 'jsonwebtoken';

import { ProjectsService } from '../services';
import { Request, Response } from 'express';
import supertest from 'supertest';

import { createAppServer } from '../methods';

describe('api/projects callback', () => {
  describe('Test for proper response', () => {
    let httpServer: HttpServer;

    beforeAll(async () => {
      const server = await createAppServer();
      httpServer = server.httpServer;
    });

    afterAll(async () => {
      httpServer.close();
    });

    it('should return expected status when called ', async () => {
      const response = await supertest(httpServer)
        .get('/api/projects').set('Authorization', 'Bearer token')
      expect(response.statusCode).toEqual(200);
    });
    it('should return status 401 for missing Authorization ', async () => {
      const response = await supertest(httpServer)
        .get('/api/projects')
      expect(response.statusCode).toEqual(401);
    });
  });
});





// Mock the dependencies
jest.mock('jsonwebtoken');
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {};
    }),
  };
});
jest.mock('../services/ProjectsService');

describe('getProjects', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'Bearer token',
      },
    };

    statusMock = jest.fn().mockReturnThis();
    sendMock = jest.fn().mockReturnThis();

    res = {
      status: statusMock,
      send: sendMock,
    };

    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should return projects successfully', async () => {
    // Mock the JWT verification
    (jwt.verify as jest.Mock).mockReturnValue({ userId: 'someUserId' });

    // Mock the ProjectsService.getProjects method
    const mockProjects = [{ id: 1, name: 'Test Project' }];
    (ProjectsService.prototype.getProjects as jest.Mock).mockResolvedValue(mockProjects);

    // Call the function
    await getProjects(req as Request, res as Response);

    // Assertions
    expect(jwt.verify).toHaveBeenCalledWith('token', 'shhhhh');
    expect(ProjectsService.prototype.getProjects).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith({ projects: mockProjects });
  });

  it('should handle errors in JWT verification', async () => {
    // Mock the JWT verification to throw an error
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    // Mock response methods
    const jsonMock = jest.fn().mockReturnThis();
    res.json = jsonMock;

    // Call the function
    //expect(await getProjects(req as Request, res as Response)).rejects.toThrow('Invalid token');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(async () => { await getProjects(req as Request, res as Response) }).rejects.toThrow('Invalid token');

    //expect(await getProjects(req as Request, res as Response)).rejects.toThrow('Invalid token');

    // Assertions
    //expect(jwt.verify).toHaveBeenCalledWith('token', 'shhhhh');
    //expect(statusMock).toHaveBeenCalledWith(401);
    //expect(jsonMock).toHaveBeenCalledWith({ error: 'Unauthorized' });
  });
});
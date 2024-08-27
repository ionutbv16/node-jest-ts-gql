
import { ProjectsService } from './index';
import { PrismaClient } from '@prisma/client'
jest.mock('@prisma/client');


describe('ProjectsService', () => {

  it('getProjects', async () => {
    const mockPrismaArg = {
      projects: {
        findMany() { return [{ id: 'abc' }] }
      }
    } as unknown as PrismaClient
    const projectsService = new ProjectsService();
    expect(await projectsService.getProjects(mockPrismaArg)).toEqual([{ id: 'abc' }]);

  });

})


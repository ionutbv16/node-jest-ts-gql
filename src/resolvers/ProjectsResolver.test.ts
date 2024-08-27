
import { ProjectsResolver } from './ProjectsResolver';
import { PrismaClient } from '@prisma/client';
import { ProjectsService } from '../services';
jest.mock('../services/ProjectsService');


describe('test ProjectsResolver', () => {

  const prisma = new PrismaClient({
    errorFormat: 'minimal'
  });

  const mockProjectsServiceValue = {
    getProjects: () => [{ id: 'sdafasdfa' }],
    getProjectByID: () => ({ id: 'sdafasdfa' }),
  }

  beforeAll(() => {
    (ProjectsService as jest.Mock).mockReturnValue(mockProjectsServiceValue);
  })

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('test getProjects', async () => {
    const returned = await ProjectsResolver.getProjects(null, {}, { prisma });
    expect(returned).toEqual([{ id: 'sdafasdfa' }]);
  })


  it('test getProjectByID', async () => {
    const returned = await ProjectsResolver.getProjectByID(null, { id: 'id' }, { prisma });
    expect(returned).toEqual({ id: 'sdafasdfa' });

  })

})


import { ProjectsService } from '../services';
import { Project } from '../entities';
import { PrismaClient } from '@prisma/client';

export const ProjectsResolver = {
  async getProjects(_parent: unknown, args: GetProjectsArgs, context: Context): Promise<Project[] | []> {
    console.log('context', args);
    const projectsService = new ProjectsService;
    console.log('projectsService');
    return projectsService.getProjects(context.prisma);
  },
  async getProjectByID(_parent: unknown, args: GetProjectsByIDArgs, context: Context): Promise<Project | null> {
    //console.log('args', args);
    const projectsService = new ProjectsService;
    return projectsService.getProjectByID(context?.prisma as PrismaClient, args.id);
  },

}

/* eslint-disable-next-line  */
interface GetProjectsArgs { }

interface GetProjectsByIDArgs {
  id: string;
}

interface Context {
  prisma?: PrismaClient;
} 
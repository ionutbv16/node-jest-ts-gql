
import { PrismaClient } from '@prisma/client'
import { Project } from '../entities';

export class ProjectsService {
  async getProjects(prisma: PrismaClient | undefined): Promise<Project[] | []> {
    let projects = [] as Project[];
    try {
      projects = await prisma?.projects.findMany() as Project[];

    } catch (error) {
      console.log('error', error)
    }
    return projects || [];
  }
  async getProjectByID(prisma: PrismaClient, id: string): Promise<Project | null> {
    const where = { id: id };
    let project = {} as Project | null;
    try {
      project = await prisma?.projects.findUnique(
        { where: where }
      );
    } catch (error) {
      console.log('error', error)
    }
    return project;
  }
}
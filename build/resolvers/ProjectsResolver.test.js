"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectsResolver_1 = require("./ProjectsResolver");
const client_1 = require("@prisma/client");
const services_1 = require("../services");
jest.mock('../services/ProjectsService');
describe('test ProjectsResolver', () => {
    const prisma = new client_1.PrismaClient({
        errorFormat: 'minimal'
    });
    const mockProjectsServiceValue = {
        getProjects: () => [{ id: 'sdafasdfa' }],
        getProjectByID: () => ({ id: 'sdafasdfa' }),
    };
    beforeAll(() => {
        services_1.ProjectsService.mockReturnValue(mockProjectsServiceValue);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });
    it('test getProjects', () => __awaiter(void 0, void 0, void 0, function* () {
        const returned = yield ProjectsResolver_1.ProjectsResolver.getProjects(null, {}, { prisma });
        expect(returned).toEqual([{ id: 'sdafasdfa' }]);
    }));
    it('test getProjectByID', () => __awaiter(void 0, void 0, void 0, function* () {
        const returned = yield ProjectsResolver_1.ProjectsResolver.getProjectByID(null, { id: 'id' }, { prisma });
        expect(returned).toEqual({ id: 'sdafasdfa' });
    }));
});

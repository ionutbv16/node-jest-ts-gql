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
exports.ProjectsService = void 0;
class ProjectsService {
    getProjects(prisma) {
        return __awaiter(this, void 0, void 0, function* () {
            let projects = [];
            try {
                projects = (yield (prisma === null || prisma === void 0 ? void 0 : prisma.projects.findMany()));
            }
            catch (error) {
                console.log('error', error);
            }
            return projects || [];
        });
    }
    getProjectByID(prisma, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = { id: id };
            let project = {};
            try {
                project = yield (prisma === null || prisma === void 0 ? void 0 : prisma.projects.findUnique({ where: where }));
            }
            catch (error) {
                console.log('error', error);
            }
            return project;
        });
    }
}
exports.ProjectsService = ProjectsService;

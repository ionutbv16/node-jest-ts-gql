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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = getProjects;
const client_1 = require("@prisma/client");
const services_1 = require("../services");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getProjects(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!request.headers.authorization) {
            response.status(401).send({
                error: 'Unauthorized'
            });
            return;
        }
        console.log('request', request.headers.authorization);
        try {
            jsonwebtoken_1.default.verify(request.headers.authorization.replace('Bearer ', ''), 'shhhhh');
        }
        catch (error) {
            response.status(401).send({
                error: 'Unauthorized'
            });
            throw new Error(error);
        }
        //console.log('decoded', decoded);
        const prisma = new client_1.PrismaClient({
            errorFormat: 'minimal'
        });
        const projectsService = new services_1.ProjectsService;
        const projects = yield projectsService.getProjects(prisma);
        response.status(200).send({
            projects,
        });
    });
}

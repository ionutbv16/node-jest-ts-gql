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
const _1 = require("./");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_1 = require("../services");
const supertest_1 = __importDefault(require("supertest"));
const methods_1 = require("../methods");
describe('api/projects callback', () => {
    describe('Test for proper response', () => {
        let httpServer;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const server = yield (0, methods_1.createAppServer)();
            httpServer = server.httpServer;
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            httpServer.close();
        }));
        it('should return expected status when called ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(httpServer)
                .get('/api/projects').set('Authorization', 'Bearer token');
            expect(response.statusCode).toEqual(200);
        }));
        it('should return status 401 for missing Authorization ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(httpServer)
                .get('/api/projects');
            expect(response.statusCode).toEqual(401);
        }));
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
    let req;
    let res;
    let statusMock;
    let sendMock;
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
    it('should return projects successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the JWT verification
        jsonwebtoken_1.default.verify.mockReturnValue({ userId: 'someUserId' });
        // Mock the ProjectsService.getProjects method
        const mockProjects = [{ id: 1, name: 'Test Project' }];
        services_1.ProjectsService.prototype.getProjects.mockResolvedValue(mockProjects);
        // Call the function
        yield (0, _1.getProjects)(req, res);
        // Assertions
        expect(jsonwebtoken_1.default.verify).toHaveBeenCalledWith('token', 'shhhhh');
        expect(services_1.ProjectsService.prototype.getProjects).toHaveBeenCalled();
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(sendMock).toHaveBeenCalledWith({ projects: mockProjects });
    }));
    it('should handle errors in JWT verification', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the JWT verification to throw an error
        jsonwebtoken_1.default.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });
        // Mock response methods
        const jsonMock = jest.fn().mockReturnThis();
        res.json = jsonMock;
        // Call the function
        //expect(await getProjects(req as Request, res as Response)).rejects.toThrow('Invalid token');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(() => __awaiter(void 0, void 0, void 0, function* () { yield (0, _1.getProjects)(req, res); })).rejects.toThrow('Invalid token');
        //expect(await getProjects(req as Request, res as Response)).rejects.toThrow('Invalid token');
        // Assertions
        //expect(jwt.verify).toHaveBeenCalledWith('token', 'shhhhh');
        //expect(statusMock).toHaveBeenCalledWith(401);
        //expect(jsonMock).toHaveBeenCalledWith({ error: 'Unauthorized' });
    }));
});

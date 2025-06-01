import { Router } from "express";
import { StudentController } from "../controllers/StudentController";
import { validate } from "../middlewares/validateMiddleware";
import { authenticateToken } from "../middlewares/authMiddleware";
import * as studentValidation from "../validations/StudentValidation";

export function StudentRoutes(studentController: StudentController) {
  const router = Router();

  /**
   * @swagger
   * tags:
   *   name: Students
   *   description: Endpoints de estudantes
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateStudentDTO:
   *       type: object
   *       required:
   *         - firstName
   *         - lastName
   *         - email
   *         - password
   *       properties:
   *         firstName:
   *           type: string
   *           example: João
   *         lastName:
   *           type: string
   *           example: Silva
   *         email:
   *           type: string
   *           format: email
   *           example: joao.silva@email.com
   *         password:
   *           type: string
   *           format: password
   *           example: senha123
   *
   *     UpdateStudentDTO:
   *       type: object
   *       properties:
   *         firstName:
   *           type: string
   *           example: João
   *         lastName:
   *           type: string
   *           example: Silva
   *         email:
   *           type: string
   *           format: email
   *           example: joao.silva@email.com
   *         password:
   *           type: string
   *           format: password
   *           example: novaSenha123
   *
   *     StudentResponseDTO:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           example: 1
   *         firstName:
   *           type: string
   *           example: João
   *         lastName:
   *           type: string
   *           example: Silva
   *         email:
   *           type: string
   *           format: email
   *           example: joao.silva@email.com
   *         lastLogin:
   *           type: string
   *           format: date-time
   *           nullable: true
   *           example: "2025-05-30T15:30:00Z"
   *         createdAt:
   *           type: string
   *           format: date-time
   *           example: "2024-05-01T10:00:00Z"
   *         updatedAt:
   *           type: string
   *           format: date-time
   *           example: "2024-06-01T10:00:00Z"
   *
   *     LoginDTO:
   *       type: object
   *       required:
   *         - email
   *         - password
   *       properties:
   *         email:
   *           type: string
   *           format: email
   *           example: joao.silva@email.com
   *         password:
   *           type: string
   *           format: password
   *           example: senha123
   */

  /**
   * @swagger
   * /register:
   *   post:
   *     summary: Criação de um novo estudante
   *     tags: [Students]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateStudentDTO'
   *     responses:
   *       201:
   *         description: Estudante criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/StudentResponseDTO'
   *       400:
   *         description: Dados inválidos
   */
  router.post(
    "/register",
    validate(studentValidation.createStudentSchema),
    studentController.create
  );

  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Autenticação
   *     tags: [Students]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginDTO'
   *     responses:
   *       200:
   *         description: Login bem-sucedido
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                 student:
   *                   $ref: '#/components/schemas/LoginDTO'
   *       401:
   *         description: Credenciais inválidas
   */
  router.post(
    "/login",
    validate(studentValidation.loginStudentSchema),
    studentController.login
  );

  // Rotas protegidas - token obrigatório
  router.use(authenticateToken);

  /**
   * @swagger
   * /me:
   *   get:
   *     summary: Retorna dados do estudante autenticado
   *     tags: [Students]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Estudante encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/StudentResponseDTO'
   *       401:
   *         description: Usuário não autenticado.
   */
  router.get("/me", studentController.getById);

  /**
   * @swagger
   * /me:
   *   put:
   *     summary: Atualiza dados do estudante autenticado
   *     tags: [Students]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateStudentDTO'
   *     responses:
   *       200:
   *         description: Estudante atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/StudentResponseDTO'
   *       401:
   *         description: Usuário não autenticado.
   */
  router.put(
    "/me",
    validate(studentValidation.updateStudentSchema),
    studentController.update
  );

  /**
   * @swagger
   * /me:
   *   delete:
   *     summary: Deletar estudante por ID
   *     tags: [Students]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       204:
   *         description: Estudante deletado com sucesso
   *       401:
   *         description: Usuário não autenticado.
   */
  router.delete("/me", studentController.delete);

  return router;
}

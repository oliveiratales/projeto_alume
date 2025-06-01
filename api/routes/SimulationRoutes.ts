import { Router } from "express";
import { SimulationController } from "../controllers/SimulationController";
import { validate } from "../middlewares/validateMiddleware";
import { authenticateToken } from "../middlewares/authMiddleware";
import * as simulationValidation from "../validations/SimulationValidation";

export function SimulationRoutes(
  simulationController: SimulationController
) {
  const router = Router();

  /**
   * @swagger
   * tags:
   *   name: Simulations
   *   description: Endpoints de simulação de financiamentos
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateSimulationDTO:
   *       type: object
   *       required:
   *         - totalAmount
   *         - monthlyInterestRate
   *         - numberOfInstallments
   *       properties:
   *         totalAmount:
   *           type: number
   *           example: 10000
   *         monthlyInterestRate:
   *           type: number
   *           example: 0.015  # juros mensal em decimal (exemplo: 1.5% = 0.015)
   *         numberOfInstallments:
   *           type: integer
   *           example: 12
   *
   *     UpdateSimulationDTO:
   *       type: object
   *       properties:
   *         totalAmount:
   *           type: number
   *           example: 12000
   *         monthlyInterestRate:
   *           type: number
   *           example: 0.015  # juros mensal em decimal (exemplo: 1.5% = 0.015)
   *         numberOfInstallments:
   *           type: integer
   *           example: 18
   *
   *     SimulationResponseDTO:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           example: 1
   *         totalAmount:
   *           type: number
   *           example: 10000
   *         monthlyInterestRate:
   *           type: number
   *           example: 0.015
   *         numberOfInstallments:
   *           type: integer
   *           example: 12
   *         monthlyInstallmentAmount:
   *           type: number
   *           example: 900
   *         createdAt:
   *           type: string
   *           format: date-time
   *           example: "2024-05-01T10:00:00Z"
   *         updatedAt:
   *           type: string
   *           format: date-time
   *           example: "2024-05-05T15:00:00Z"
   */

  /**
   * @swagger
   * /simulations:
   *   get:
   *     summary: Lista as simulações do usuário autenticado
   *     tags: [Simulations]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de simulações do usuário
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/SimulationResponseDTO'
   */
  router.get("/", authenticateToken, simulationController.listByStudent);

  /**
   * @swagger
   * /simulations:
   *   post:
   *     summary: Criar uma nova simulação de financiamento
   *     tags: [Simulations]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateSimulationDTO'
   *     responses:
   *       201:
   *         description: Simulação criada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SimulationResponseDTO'
   *       400:
   *         description: Dados inválidos
   */
  router.post(
    "/",
    authenticateToken,
    validate(simulationValidation.createSimulationSchema),
    simulationController.create
  );

  /**
   * @swagger
   * /simulations/{id}:
   *   get:
   *     summary: Obter simulação de financiamento por ID
   *     tags: [Simulations]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da simulação
   *     responses:
   *       200:
   *         description: Simulação encontrada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SimulationResponseDTO'
   *       404:
   *         description: Simulação não encontrada
   */
  router.get("/:id", authenticateToken, simulationController.getById);

  /**
   * @swagger
   * /simulations/{id}:
   *   put:
   *     summary: Atualizar simulação de financiamento por ID
   *     tags: [Simulations]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da simulação
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateSimulationDTO'
   *     responses:
   *       200:
   *         description: Simulação atualizada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SimulationResponseDTO'
   *       404:
   *         description: Simulação não encontrada
   */
  router.put(
    "/:id",
    authenticateToken,
    validate(simulationValidation.updateSimulationSchema),
    simulationController.update
  );

  /**
   * @swagger
   * /simulations/{id}:
   *   delete:
   *     summary: Deletar simulação de financiamento por ID
   *     tags: [Simulations]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da simulação
   *     responses:
   *       204:
   *         description: Simulação deletada com sucesso
   *       404:
   *         description: Simulação não encontrada
   */
  router.delete("/:id", authenticateToken, simulationController.delete);

  return router;
}

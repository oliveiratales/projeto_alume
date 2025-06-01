import { Router } from "express";
import { StudentController } from "../controllers/StudentController";
import { SimulationController } from "../controllers/SimulationController";
import { StudentRoutes } from "./StudentRoutes";
import { SimulationRoutes } from "./SimulationRoutes";

const router = Router();
const studentController = new StudentController();
const simulationController = new SimulationController();

router.use("/", StudentRoutes(studentController));
router.use("/simulations", SimulationRoutes(simulationController));

export default router;

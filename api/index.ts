import express from "express";
import routes from "./routes";
import { setupDatabase } from "./config/setup";
import * as env from "./config/env";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger";
import { errorHandlerMiddleware } from "./middlewares/errorHandleMiddleware";

const app = express();
app.use(express.json());

app.use("/api", routes);
app.use(errorHandlerMiddleware);

const PORT = env.PORT || 3000;

setupDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server iniciado na porta ${PORT}`);

      // Documentação Swagger
      if (env.ENVIRONMENT === "development") {
        const docsPath = "/swagger";
        app.use(docsPath, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        console.log(
          `⚡ Documentação Swagger em http://localhost:${
            env.PORT || 3000
          }${docsPath}`
        );
      }
    });
  })
  .catch((error) => {
    console.error("❌ Falha ao iniciar o banco de dados:", error);
    process.exit(1);
  });

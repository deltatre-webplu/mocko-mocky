import { Server } from "http";
import * as express from "express";
import { requestLogger } from "./middlewares/requestLogger";
import { requestParser } from "./middlewares/requestParser";
import router from "./router";

export default class MockoMockyServer {
  private app: express.Application;
  private server: Server | null = null;

  constructor() {
    this.app = express();

    this.app.use(requestLogger());
    this.app.use(requestParser());

    this.app.use(router);
  }

  public async start() {
    const port = process.env.PORT || 3000;

    this.server = this.app.listen(port, () => {
      console.log(`mocko-mocky is listening on port ${port}`);
    });
  }

  public async stop() {
    if (this.server) {
      this.server.close();
    }
  }
}

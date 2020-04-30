import { Router, Request, Response, NextFunction } from "express";
import { sleep } from "./utils";

const router = Router();

router.get("/", async (_: Request, response: Response, __: NextFunction) => {
  response
    .status(200)
    .send("Hello from mocko-mocky!");
});

router.get("/request", async (request: Request, response: Response, next: NextFunction) => {
  const { status, timeout, delay } = readStatusTimeoutAndDelay(request);

  if (timeout) {
    handleTimeout(request, response, timeout);
  }

  if (delay) {
    await sleep(delay);
  }

  if (!(request as any).timedout) {
    response.sendStatus(status);
  }

  next();
});

router.post("/request", async (request: Request, response: Response, next: NextFunction) => {
  const { status, timeout, delay } = readStatusTimeoutAndDelay(request);

  const { headers, body } = request.body;
  if (typeof headers === "object") {
    setProvidedHeadersInResponse(response, headers);
  }

  if (timeout) {
    handleTimeout(request, response, timeout);
  }

  if (delay) {
    await sleep(delay);
  }

  if (!(request as any).timedout) {
    response
      .status(status)
      .send(body);
  }

  next();
});

const readStatusTimeoutAndDelay = (request: Request) => ({
  status: Number(request.query.status) || 200,
  timeout: Number(request.query.timeout) || 0,
  delay: Number(request.query.delay) || 0
});

function setProvidedHeadersInResponse(response: Response, headers: any) {
  for (const header in headers) {
    if (headers.hasOwnProperty(header)) {
      response.setHeader(header, headers[header]);
    }
  }
}

function handleTimeout(request: Request, response: Response, timeout: number) {
  response.setTimeout(timeout, () => {
    (request as any).timedout = true;
    response.sendStatus(408);
  });
}

export default router;
import MockoMockyServer from "./app/server";

const server = new MockoMockyServer();

process.on("exit", function () {
  server.stop();
});

server
	.start()
	.catch((err: Error) => console.error(err));

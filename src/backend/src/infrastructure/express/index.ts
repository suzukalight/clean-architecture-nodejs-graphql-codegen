import express, { Express } from 'express';
import cors from 'cors';
import http from 'http';

export const createExpressApp = (): Express => {
  // Create Express app instance
  const app = express();

  // Configure Express App
  app.use(cors());

  return app;
};

export const createHttpServer = (app: Express): http.Server => {
  // Create HTTP Server
  const httpServer = http.createServer(app);

  return httpServer;
};

export const runHttpServer = (httpServer: http.Server) => {
  // Run server and listen http request
  const port = 3000;
  httpServer.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
  });
};

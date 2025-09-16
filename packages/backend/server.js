// server.js
import express from "express";

export class Server {
  constructor(app, port) {
    this.controllers = {};
    this.routes = [];
    this.app = app;
    this.port = port;
    this.app.use(express.json());
  }

  getApp() {
    return this.app;
  }

  setController(controllerClass, controller) {
    this.controllers[controllerClass.name] = controller;
  }

  getController(controllerClass) {
    const controller = this.controllers[controllerClass.name];
    if (!controller) {
      throw new Error("Controller missing for the given route.");
    }
    return controller;
  }

  addRoute(route) {
    this.routes.push(route);
  }

  configureRoutes() {
    this.routes.forEach((route) =>
      this.app.use(route(this.getController.bind(this)))
    );
  }

  launch() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

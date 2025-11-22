import express from "express";
import {errorHandler} from "./middleware/errorHandler.js";

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

    configureErrorHandling() {
        this.app.use((err, req, res, next) => {
            errorHandler(err, req, res, next);
        });
    }

    launch(callback) {
        this.app.listen(this.port, () => {
            if (callback) {
                callback();
            } else {
                console.log(`Server running on port ${this.port}`);
            }
        });
    }
}
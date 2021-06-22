import "express-async-errors";

import express from "express";

import { server_config } from "../config/server.config";
import { useExpressServer } from "routing-controllers";
import { UserController } from "../modules/user/user.controller";
import { MakeJSON } from "../interceptors/MakeJSON.interceptor";

export const appLoader = () => {
	const app = express();

	app.use(express.json({ limit: "10mb" }));
	app.use(express.urlencoded({ extended: false }));

	useExpressServer(app, {
		controllers: [UserController],
		routePrefix: server_config.ENDPOINT_PREFIX,
		cors: true,
		interceptors: [MakeJSON],
	});

	app.listen(server_config.PORT, () => console.log("App: Startup complete."));
};

// shim
import "reflect-metadata";

// environment variables
import { config as envLoader } from "dotenv";
envLoader()

// import loaders
import { databaseLoader } from "./loaders/database.loader";
import { appLoader } from "./loaders/app.loader";

// server startup
(async () => {
	// preserve the order or loaders
	await databaseLoader()	
	appLoader();
})();

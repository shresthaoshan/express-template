import mongoose, { ConnectOptions } from "mongoose";

import { database_config } from "../config/database.config";
import { registerModels } from "../utils/modelRegistration";

// schemas
import { userSchema } from "../modules/user/user.schema";

const _opts: ConnectOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
};

export const databaseLoader = async () => {
	mongoose.connection.once("open", () => {
		console.log("Database: MongoDB Connected.");
	});

	mongoose.connection.on("error", (err) => {
		console.log("Database: MongoDB Connection Error.");
		console.log("Database: Aborting.");
		throw new Error(err);
	});

	await mongoose.connect(database_config.URL, _opts);

	registerModels(["User", userSchema]);

	console.log("Database: Ready.");
};

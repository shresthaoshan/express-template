import { model, Schema } from "mongoose";
import type { SchemaDefinition } from "mongoose";

type ModelData = [string, any];
export const registerModels = (...modelData: ModelData[]) => {
	for (let [name, schema] of modelData) model(name, schema as Schema);
};

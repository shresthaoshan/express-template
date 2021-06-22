import { model, Schema } from "mongoose";

type ModelData = [string, Schema];
export const registerModels = (...modelData: ModelData[]) => {
	for (let each of modelData) model(...each);
};

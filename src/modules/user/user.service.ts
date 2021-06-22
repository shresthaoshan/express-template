import Container, { Service } from "typedi";

import { model } from "mongoose";
import { PasswordManager } from "../../utils/passwordManager";
import { UserModelInterface } from "./user.schema";

@Service()
export class UserService {
	constructor(
		private user = model("User"),
		private sha256 = Container.get(PasswordManager)
	) {}

	get = () => {
		return this.user.find({}).select("-password").lean();
	};

	set = async (payload: UserModelInterface) => {
		payload.password = this.sha256.hash(payload.password);

		const newUser = new this.user({
			...payload,
		});

		return (await newUser.save()).id;
	};

	login = async (email: string, password: string) => {
		const user: UserModelInterface = await this.user
			.findOne({ email })
			.lean();

		if (!user) throw new Error("Credentials did not match.");

		return await this.sha256.verify(password, user.password);
	};
}

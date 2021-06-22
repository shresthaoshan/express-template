import Container from "typedi";

import { UserService } from "./user.service";
import { Body, Get, JsonController, Post } from "routing-controllers";
import { UserModelInterface } from "./user.schema";

@JsonController("/user")
export class UserController {
	constructor(private service = Container.get(UserService)) {}

	@Get()
	async get() {
		const records = await this.service.get();
		return records;
	}

	@Post("/register")
	async set(@Body() userData: UserModelInterface) {
		const id = await this.service.set(userData);
		return { id };
	}

	@Post("/login")
	async login(@Body() userData: { email: string; password: string }) {
		const success = await this.service.login(
			userData.email,
			userData.password
		);
		return { success };
	}
}

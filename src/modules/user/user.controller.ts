import Container from "typedi";

import { UserService } from "./user.service";
import { Body, Get, JsonController, Post } from "routing-controllers";
import { UserModelInterface } from "./user.schema";
import { LoginType } from "./user.params";

@JsonController("/user")
export class UserController {
	constructor(private service = Container.get(UserService)) {}

	@Get()
	async get() {
		return this.service.get();
	}

	@Post("/register")
	async set(@Body() userData: UserModelInterface) {
		const id = await this.service.set(userData);
		return { id };
	}

	@Post("/login")
	async login(@Body({ validate: true }) userData: LoginType) {
		const success = await this.service.login(
			userData.email,
			userData.password
		);
		return { success };
	}
}

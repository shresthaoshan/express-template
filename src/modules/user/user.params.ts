import { IsEmail, MinLength } from "class-validator";

export class LoginType {
	@IsEmail()
	email!: string;

	@MinLength(6)
	password!: string;
}

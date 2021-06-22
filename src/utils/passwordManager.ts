import { Service } from "typedi";
import { sha256 } from "hash.js";
import { auth_config } from "../config/auth.config";

@Service()
export class PasswordManager {
	constructor(private salt = auth_config.SALT) {}

	hash(password: string) {
		return sha256()
			.update(this.salt + password)
			.digest("hex");
	}

	async verify(password: string, hashed: string) {
		if (this.hash(password) !== hashed)
			throw new Error("Password did not match.");
		return true;
	}
}

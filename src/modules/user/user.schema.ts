import { Document, Schema } from "mongoose";

// interface
export interface UserModelInterface extends Document {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	phone: { number: number; isVerified: boolean };
	country: {
		name: string;
		extCode: string;
	};
	address: string;
}

// schema
const userSchema = new Schema<UserModelInterface>(
	{
		firstName: Schema.Types.String,
		lastName: Schema.Types.String,
		address: Schema.Types.String,
		email: {
			type: Schema.Types.String,
			required: "Email of user is required",
		},
		password: {
			type: Schema.Types.String,
			required: "Password cannot be empty.",
		},
		phone: {
			number: Schema.Types.Number,
			isVerified: Schema.Types.Boolean,
		},
		country: {
			name: Schema.Types.String,
			extCode: Schema.Types.String,
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
);

// hooks
userSchema.pre("save", async function (next) {
	if (this.isNew) {
		const recExists = await this.collection.findOne({ email: this.email });
		if (recExists) throw new Error("User already exists.");
	}
	next();
});

export { userSchema };

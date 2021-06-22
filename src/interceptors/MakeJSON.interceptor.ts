import { Action, Interceptor, InterceptorInterface } from "routing-controllers";

@Interceptor()
export class MakeJSON implements InterceptorInterface {
	intercept(_: Action, content: any) {
		return typeof content == "object"
			? JSON.parse(JSON.stringify(content))
			: content;
	}
}

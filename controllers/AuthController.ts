import { RouterContext, hashSync, compareSync } from "../deps.ts";
import { User } from "../models/User.ts";

class AuthController {
  login() {}
  async register(ctx: RouterContext) {
    const { name, email, password } = await ctx.request.body().value;
    const user = await User.findOne({ email });

    if (user) {
      ctx.response.status = 422;
      ctx.response.body = {
        message: "Email is already used",
      };
      return;
    }

    const hashedPassword = hashSync(password);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    ctx.response.status = 201;
    ctx.response.body = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  }
}

export const authController = new AuthController();

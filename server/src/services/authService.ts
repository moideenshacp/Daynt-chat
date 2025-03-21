import bcrypt from "bcryptjs";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";

const register = async (name: string, email: string, password: string) => {
  try {    
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    return { id: user._id, name: user.name, email: user.email };
  } catch (error: any) {
    throw new Error(error.message || "Error during registration");
  }
};

const login = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");
console.log(password,"pass");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    };
  } catch (error: any) {
    throw new Error(error.message || "Error during login");
  }
};

export default { register, login };

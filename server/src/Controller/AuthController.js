import { UserModel } from "../Model/userModel.js";
import bcrypt from 'bcrypt';

// Registering a new User
export const registerUser = async (request, response) => {
  try {
    const newPassword = await bcrypt.hashSync(request.body.password, 12);
    request.body["password"] = newPassword;
    const user = new UserModel(request.body);
    const savedUser = await user.save();
    response.status(200).json(savedUser);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// login a user

export const loginUser = async (request, response) => {
    try {
        const user = await UserModel.findOne({ username: request.body.username });
        if (user) {
            if(bcrypt.compareSync(request.body.password, user.password)) {
                // const token = jwt.sign({adminId: admin._id}, "hello1234")
                response.status(200).json({ message: "successfully login"});
            }
            else{
                response.status(404).json({message: "Invalid password"});
            }
        }
        else{
            response.status(404).json({message: "Invalid username"});
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}
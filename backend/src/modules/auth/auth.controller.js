const { registerUser, loginUser } = require("./auth.service")

const register = async(req, res) =>{
    try{
        const{firstName,lastName,email,password} = req.body || {};

        if(!firstName || !lastName || !email ||!password){
            return res.status(400).json({
                message:"First name, last name, email and passowrd are required"
            });
        }
        
        const user = await registerUser({ firstName, lastName, email, password });
        return res.status(201).json({
            message:"User register successfully",
            user
        });
    }catch (error){
        return res.status(400).json({
            message: error.message
        });
    }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }

    const result = await loginUser({ email, password });

    return res.status(200).json({
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
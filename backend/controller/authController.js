
import User from '../model/user'

const register = async (req, req) => {

    const {name, email, password, role} = req.body;

    const hashPassword = bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashPassword,
        role
    })
    const jwttoken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }   );

    res.json({
        user: user,
        token: jwttoken,
        message: "User registered successfully"
    });

}


const login = async (req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({message: "Invalid password"});

    const jwttoken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } );

    res.json({
        user: user,
        token: jwttoken,
        message: "User login successfully"

    });
}

export {login, register}
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



export const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });

    try {
        await newUser.save();
        res.status(201).json({success:true, message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ success:false,message: error.message });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.json({ message: 'Invalid credentials',success:false });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token,user, message :"Login successfull",success:true });
    } catch (error) {
        res.status(500).json({ message: error.message,success:true });
    }
};



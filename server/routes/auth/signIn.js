// signIn.js
import express from 'express';
import bcryptjs from 'bcryptjs';
import User from '../../mongodb/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // If everything is correct, user is authenticated
        res.status(200).json({ message: 'Sign-in successful', user: user });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;

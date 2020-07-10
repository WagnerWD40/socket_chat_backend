import User from '../models/User';
import { generateToken } from '../services/auth';

class LoginController {

    async store(req, res) {
        const { email, password } = req.body;

        try {
            const foundUser = await User.findOne({ email });

            if (foundUser) {
                if (await foundUser.validatePassword(password)) {
                    const token = generateToken({ username: foundUser.username });

                    return res.status(200).json({ token });
                };

                return res.status(403).json({ error: 'Invalid Password.' });
            };

            return res.status(400).json({ error: 'User does not exist.' });

        } catch (err) {
            console.error(err);
        };

        return res.status(201).json({ message: 'ok' });
    };
};

export default new LoginController();
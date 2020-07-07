import User from '../models/User';

class LoginController {

    async store(req, res) {
        console.log(req.body);
        const { email, password } = req.body;

        try {
            const foundUser = await User.findOne({ email });

            if (foundUser) {
                if (await foundUser.validatePassword(password)) {
                    return res.status(200).json({ message: 'Password OK' });
                };
            };

            return res.status(400).json({ error: 'User does not exist.' });

        } catch (err) {
            console.error(err);
        };

        return res.status(201).json({ message: 'ok' });
    };
};

export default new LoginController();
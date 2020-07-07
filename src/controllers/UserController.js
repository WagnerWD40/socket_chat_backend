import User from '../models/User';

class UserController {

    async store(req, res) {
        const newUser = new User(req.body);

        try {
            await newUser.save();
        } catch (err) {
            console.error(err);
        };
        
        return res.status(201)
                .json(newUser);
    };

    async index(req, res) {
        const users = await User.find();

        return res.status(200).json(users);
    };

    async show(req, res) {
        const { id } = req.params;

        try {
            const foundUser = await User.findById(id);
            
            if (foundUser) {
                return res.status(200).json(foundUser);
            };

            return res.status(400).json({ error: 'User not found.' });
        } catch (err) {
            console.error(err);
        };
    };

    async update(req, res) {
        const { id } = req.params;

        try {
            const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

            if (req.body.password && updatedUser) {
                await updatedUser.createNewPassword(req.body.password);
            };

            if (updatedUser) {
                await updatedUser.save();
                return res.status(200).json({ message: `User id:${id} updated with success.` });
            };

            return res.status(400).json({ message: `User id:${id} not found.` });
        } catch (err) {
            console.error(err);
        };
    };

    async del(req, res) {
        const { id } = req.params;

        try {
            const foundUser = await User.findById(id);

            if(foundUser) {
                await foundUser.deleteOne();

                return res.status(200).json({ message: `User id:${id} deleted with success.` });
            };

            return res.status(400).json({ message: `User id:${id} not found.` });
        } catch (err) {
            console.error(err);
        };
    };
};

export default new UserController();

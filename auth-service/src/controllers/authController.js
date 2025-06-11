const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const SECRET_KEY = 'prueba_web';

exports.register = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Verificar si el usuario ya existe
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        user = new User({
            username,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar usuario
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Crear token
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ _id : user._id, username: user.username, token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

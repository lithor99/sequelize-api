const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.create = async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10)
    const user = {
        username: req.body.username,
        password: password
    };
    User.create(user).then((data) => {
        return res.status(200).json({ result: data });
    }).catch((error) => {
        return res.status(500).json({ result: error });
    })
}

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ where: { username: username } }).then((data) => {
        const validPassword = bcrypt.compare(password, data.password);
        if (validPassword) {
            const user = { ID: data.id, USERNAME: data.username };
            const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '120d' });
            return res.status(200).json({ result: 'Login success', token: token });
        }
        return res.status(403).json({ result: 'Login failed' });
    }).catch((error) => {
        return res.status(500).json({ result: error });
    });
}

exports.findAll = (req, res) => {
    const payload = req.payload;
    console.log('payload: ', payload);
    User.findAndCountAll().then((data) => {
        return res.status(200).json({ result: data });
    }).catch((error) => {
        return res.status(500).json({ result: error });
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findOne({ where: { id: id } }).then((data) => {
        return res.status(200).json({ result: data });
    }).catch((error) => {
        return res.status(500).json({ result: error });
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
    User.update(
        { ...req.body },
        { where: { id: id } }
    ).then((data) => {
        return res.status(200).json({ result: data });
    }).catch((error) => {
        return res.status(500).json({ result: error });
    })
}


exports.delete = (req, res) => {
    const id = req.params.id;
    Category.destroy({ where: { id: id } }).then((data) => {
        return res.status(200).json({ result: data });
    }).catch((error) => {
        return res.status(500).json({ result: error });
    })
}


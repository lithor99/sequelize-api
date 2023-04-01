const Product = require('../models/product.model');
const Category = require('../models/category.model');
const sequelize = require('../config/db');


exports.create = (req, res) => {
    Product.create({ ...req.body }).then((data) => {
        return res.status(200).json({ result: data });
    }).catch((error) => {
        return res.status(500).json({ result: error });
    })
}

exports.findAll = (req, res) => {

    sequelize.query(`SELECT pr.id, pr.name, ca.category, pr.description, 
        pr.qauntity, pr.price, pr.createdAt, pr.updatedAt
        FROM products pr INNER JOIN categories ca ON pr.category = ca.id`,
        { type: sequelize.QueryTypes.SELECT }).then((data) => {
            return res.status(200).json({ result: data });
        }
        ).catch((error) => {
            return res.status(500).json({ result: error });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Product.findOne({ where: { id: id } }).then((data) => {
        return res.status(200).json({ result: data });
    }).catch((error) => {
        return res.status(500).json({ result: error });
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
    Product.update(
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
    Product.destroy({ where: { id: id } }).then((data) => {
        return res.status(200).json({ result: data });
    }).catch((error) => {
        return res.status(500).json({ result: error });
    })
}


const taskItemsModel = require('../models/taskItems');

const addItem = async (req, res) => {
    try {
        const newItem = new taskItemsModel({
            item: req.body.item
        })
        const saveItem = await newItem.save();
        res.status(200).json(saveItem);
    } catch (err) {
        res.json(err);
    }
}

const getItemsList = async (req, res) => {
    try {
        const allTaskItems = await taskItemsModel.find({});
        res.status(200).json(allTaskItems);
    } catch (err) {
        res.json(err);
    }
}

const deleteItem = async (req, res) => {
    try {
        const deleteItem = await taskItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Item deleted successfully');
    } catch (err) {
        res.json(err);
    }
}

const updateItem = async (req, res) => {
    try {
        const updateItem = await taskItemsModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json('Item updated successfully');
    } catch (err) {
        res.json(err);
    }
}

const getCurrItem = async (req, res) => {
    try {
        const currItem = await taskItemsModel.findById(req.params.id);
        res.status(200).json(currItem);
    } catch (err) {
        res.json(err);
    }
}

module.exports = { addItem, getItemsList, deleteItem, updateItem, getCurrItem };
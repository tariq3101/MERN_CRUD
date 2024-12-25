const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const router = express.Router();

//craete
router.post("/", async (req, res) => {
    const { name, email, age } = req.body;
    const User = require("../models/userModel");

    try {
        const userAdded = await User.create({
            name: name,
            email: email,
            age: age,
        });

        res.status(201).json(userAdded);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
})

//Fetch All user
router.get("/", async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
});

//Fetch only one user by id
router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const singleUser = await User.findById({ _id: id});
        res.status(200).json(singleUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
});

//Delete user by id
router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const singleUser = await User.findByIdAndDelete({ _id: id});
        res.status(200).json(singleUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
});

//Update user by id
router.patch("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email, age} = req.body;
        const updateUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
});
module.exports = router;
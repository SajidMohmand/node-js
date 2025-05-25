const User = require("../models/user")


async function handleGetAllUsers(req,res){
    const allDbUsers = await User.find({});
    return res.status(200).send(allDbUsers);
}

async function handleGetUserById(req,res){
    const user = await User.findById(req.params.id);
    return res.status(200).json(user)
}

async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id, {lastName: "Capital"})
    res.status(200).json({
        name: "successfully updated",
    })
}

async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id)
    return res.status(200).json({
        status: "Successfully Delete."
    })
}

async function handleCreateNewUser(req,res){
    if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.gender || !req.body.jobTitle){
        return res.status(400).json({
            res: "All field must required"
        })
    }

    const result = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        jobTitle: req.body.jobTitle,
    })

    console.log(result);
    
    return res.status(201).json({
        msg: "user created successfully"
    })
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}
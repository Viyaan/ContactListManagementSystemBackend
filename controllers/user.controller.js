const user = require('../models/user.model.js');
const mongoose = require('mongoose');

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request

    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Create a user
    const userModel = new user({
		
        _id: mongoose.Types.ObjectId(),
        username: req.body.username,
		password: req.body.password,
		roles: req.body.roles
		
    });

    // Save user in the database
    userModel.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    user.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    user.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};


// Find a single user with a username
exports.findUser = (req, res) => {
    user.findOne({'username':req.body.username})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with name " + req.body.username
            });            
        }
        res.send(user.roles);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with name " + req.body.username
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with name " + req.body.username
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Find user and update it with the request body
    user.findByIdAndUpdate(req.params.userId, {
         _id: req.params.userId,
		username: req.body.username,
		password: req.body.password,
		roles: req.body.roles
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    user.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};
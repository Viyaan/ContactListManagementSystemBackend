const contact = require('../models/contact.model.js');
const mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
const config = require('../config/secret.config.js');

// Create and Save a new contact
exports.create = (req, res) => {
    // Validate request
    verifyToken(req, res);
    if (!req.body) {
        return res.status(400).send({
            message: "contact content can not be empty"
        });
    }

    // Create a contact
    const contactModel = new contact({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        add: req.body.add,
        tel: req.body.tel,
        email: req.body.email,
        faceId: req.body.faceId
    });

    // Save contact in the database
    contactModel.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the contact."
            });
        });
};

// Retrieve and return all contacts from the database.
exports.findAll = (req, res) => {
    verifyToken(req, res);
    contact.find()
        .then(contacts => {
            res.send(contacts);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving contacts."
            });
        });
};

function verifyToken(req, res) {

    if (!req.headers.authorization) {
        console.log('no auth header')
        return res.status(401).send('Unauthorised Request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {

        return res.status(401).send('Unauthorised Request')
    }
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            return res.json({
                success: false,
                message: 'Failed to authenticate token.'
            });
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            //next();
        }
    });

}

// Find a single contact with a contactId
exports.findOne = (req, res) => {
    verifyToken(req, res);
    contact.findById(req.params.contactId)
        .then(contact => {
            if (!contact) {
                return res.status(404).send({
                    message: "contact not found with id " + req.params.contactId
                });
            }
            res.send(contact);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "contact not found with id " + req.params.contactId
                });
            }
            return res.status(500).send({
                message: "Error retrieving contact with id " + req.params.contactId
            });
        });
};

// Update a contact identified by the contactId in the request
exports.update = (req, res) => {
    // Validate Request
    verifyToken(req, res);
    if (!req.body) {
        return res.status(400).send({
            message: "contact content can not be empty"
        });
    }

    // Find contact and update it with the request body
    console.log(req.params.contactId);
    contact.findByIdAndUpdate(req.params.contactId, {
            _id: req.params.contactId,
            name: req.body.name,
            add: req.body.add,
            tel: req.body.tel,
            email: req.body.email,
            faceId: req.body.faceId
        }, {
            upsert: true,
            new: true
        })
        .then(contact => {
            console.log(contact)
            if (!contact) {

                return res.status(404).send({
                    message: "contact not found with id " + req.params.contactId
                });
            }
            res.send(contact);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "contact not found with id " + req.params.contactId
                });
            }
            return res.status(500).send({
                message: "Error updating contact with id " + req.params.contactId
            });
        });
};

// Delete a contact with the specified contactId in the request
exports.delete = (req, res) => {
    verifyToken(req, res);
    contact.findByIdAndRemove(req.params.contactId)
        .then(contact => {
            if (!contact) {
                return res.status(404).send({
                    message: "contact not found with id " + req.params.contactId
                });
            }
            res.send({
                message: "contact deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "contact not found with id " + req.params.contactId
                });
            }
            return res.status(500).send({
                message: "Could not delete contact with id " + req.params.contactId
            });
        });
};
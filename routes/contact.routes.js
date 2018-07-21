module.exports = (app) => {
    const contacts = require('../controllers/contact.controller.js');
	
	app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
 
  next();
});

    // Create a new Contact
    app.post('/contacts', contacts.create);

    // Retrieve all Contacts
    app.get('/contacts', contacts.findAll);

    // Retrieve a single Contact with contactId
    app.get('/contacts/:contactId', contacts.findOne);

    // Update a Contact with contactId
    app.put('/contacts/:contactId', contacts.update);

    // Delete a Contact with contactId
    app.delete('/contacts/:contactId', contacts.delete);
}
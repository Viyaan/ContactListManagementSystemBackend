module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
	
	app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
 
  next();
});

    // Create a new user
    app.post('/users', users.create);
	
	// Find a single user with username
    app.post('/users/auth', users.findUser);

    // Retrieve all users
    app.get('/users', users.findAll);

    // Retrieve a single user with userId
    app.get('/users/:userId', users.findOne);

    // Update a user with userId
    app.put('/users/:userId', users.update);

    // Delete a user with userId
    app.delete('/users/:userId', users.delete);
}
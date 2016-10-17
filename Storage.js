/* jshint esversion:6 */

/*
	This is our extensible storage object. We've written it so that we can
	replace any parts of it in the future with calls to file system or mongo
	without too much effort.
*/
function Storage() {
	var projects = [];
	var users = [];

	this.authenticateUser = (name, pw) => {
		for (var i = 0; i < users.length; i++) {
			if (users[i].name === name && users[i].password === pw) {
				return true;
			}
		}
		return false;
	};

	this.addProject = (project, cb) => {
		// cb = callback
		projects.push(project);
		if (cb) {
			cb();
		}
	};

	this.addUser = (userObject) => {
		users.push(userObject);
		console.log(users);
	};

	this.userExists = (username, email) => {
		for (var i = 0; i < users.length; i++) {
			var currentUser = users[i];
			if (currentUser.name === username || currentUser === email) {
				return true;
			}
		}
		return false;
	};

	this.getAllProjects = (cb) => {
		// cb = callback
		cb(projects);
	};

	this.getProjectByName = (name, cb) => {
        cb(projects.find((el) => {
            return el.name === name;
        }));
    };
}

module.exports = Storage;

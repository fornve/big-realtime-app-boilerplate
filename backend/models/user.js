const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
    });

    // force: true will drop the table if it already exists
    User.sync({force: false}).then(() => {
        // Table created
    });

    return User;
};

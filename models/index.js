const User = require('./user.js');
const Posts = require('./posts.js');

User.hasMany(Posts, {
  foreignKey: 'user_id',
});
Posts.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Posts };

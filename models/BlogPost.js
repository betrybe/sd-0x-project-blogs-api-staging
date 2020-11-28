const BlogPost = (sequelize, DataTypes) => sequelize.define('BlogPost',
  {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });

module.exports = BlogPost;

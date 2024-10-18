const { GraphQLList } = require('graphql');
const { TaskType } = require('./types');
const { Task } = require('../../db');

const queries = {
  tasks: {
    type: new GraphQLList(TaskType),
    resolve() {
      return Task.findAll();
    },
  },
};

module.exports = queries;

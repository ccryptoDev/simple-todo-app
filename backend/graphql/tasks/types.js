const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID } = require('graphql');

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    date_created: { type: GraphQLString },
  },
});

module.exports = { TaskType };

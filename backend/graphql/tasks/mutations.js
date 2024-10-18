const { GraphQLID, GraphQLString, GraphQLBoolean } = require('graphql');
const { Op } = require('sequelize');
const { TaskType } = require('./types');
const { Task } = require('../../db');

const mutations = {
  addTask: {
    type: TaskType,
    args: {
      title: { type: GraphQLString },
    },
    resolve(_, { title }) {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));  
      const endOfDay = new Date(today.setHours(23, 59, 59, 999)); 

      return Task.findOne({
        where: {
          title, 
          date_created: {
            [Op.between]: [startOfDay, endOfDay], 
          },
        },
      }).then((existingTask) => {
        if (existingTask) {
          throw new Error('A task with the same title already exists.');
        }

        return Task.create({
          title: title
        });
      });
    },
  },
  updateTask: {
    type: TaskType,
    args: {
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      completed: { type: GraphQLBoolean },
    },
    resolve(_, { id, title, completed }) {
      return Task.update({ title, completed }, { where: { id } }).then(() => Task.findByPk(id));
    },
  },
  deleteTask: {
    type: TaskType,
    args: { id: { type: GraphQLID } },
    resolve(_, { id }) {
      return Task.destroy({ where: { id } }).then(() => ({ id }));
    },
  },
};

module.exports = mutations;

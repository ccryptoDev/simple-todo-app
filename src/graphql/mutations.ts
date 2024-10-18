import { gql } from '@apollo/client';

export const ADD_TASK = gql`
  mutation AddTask($title: String!) {
    addTask(title: $title) {
      id
      title
      completed
      date_created
    }
  }
`;

export const TOGGLE_TASK = gql`
  mutation ToggleTask($id: ID!, $completed: Boolean!) {
    updateTask(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id){
      id
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $title: String!) {
    updateTask(id: $id, title: $title) {
      id
      title
    }
  }
`;
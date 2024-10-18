query = `query {
  tasks {
    id
    title
    completed
    date_created
  }
}
`;

add_task = `mutation {
  addTask(title: "New Task") {
    id
    title
    completed
    date_created
  }
}
`;

update_task = `mutation {
  updateTask(id: 1, title: "Updated Task", completed: true) {
    id
    title
    completed
    date_created
  }
}
`;

delete_task = `mutation {
  deleteTask(id: 1) {
    id
  }
}
`;
import React, { useState } from 'react';
import { Task } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: number, completed: boolean) => void;
  onDeleteTask: (id: number) => void;
  onUpdateTask: (id: number, newTitle: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDeleteTask, onUpdateTask }) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setNewTitle(task.title); 
  };

  const handleUpdateClick = (taskId: number) => {
    if (newTitle.trim()) {
      onUpdateTask(taskId, newTitle); 
      setEditingTaskId(null); 
    }
  };

  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2 text-blue-500">ID</th>
          <th className="border px-4 py-2 text-blue-500">Title</th>
          <th className="border px-4 py-2 text-blue-500">Completion Status</th>
          <th className="border px-4 py-2 text-blue-500">Created At</th>
          <th className="border px-4 py-2 text-blue-500">  </th>
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0 ? (
          <tr>
            <td colSpan={5} className="border text-center py-4 text-white-500">
              No tasks available.
            </td>
          </tr>
        ) : (
          tasks.map((task) => (
            <tr key={task.id}>
              <td className="border px-4 py-2 text-center">{task.id}</td>
              <td className="border px-4 py-2 text-center">
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="border rounded p-1 text-gray-500"
                  />
                ) : (
                  task.title
                )}
              </td>
              <td className="border px-4 py-2 text-center">
                <button onClick={() => onToggleComplete(task.id, task.completed)} className="mr-2">
                  <FontAwesomeIcon icon={faCheck} className={task.completed ? 'text-green-500 hover:text-green-600' : 'text-gray-500 hover:text-gray-600'} />
                </button>
              </td>
              <td className="border px-4 py-2 text-center">
                {format(new Date(Number(task.date_created)), 'yyyy/MM/dd')}
              </td>
              <td className="border px-4 py-2 text-center">
                {editingTaskId === task.id ? (
                  <button onClick={() => handleUpdateClick(task.id)} className=" mr-2 text-green-500">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                ) : (
                  <button onClick={() => handleEditClick(task)} className="mr-2">
                    <FontAwesomeIcon icon={faEdit} className="text-blue-500 hover:text-blue-600" />
                  </button>
                )}
                <button onClick={() => onDeleteTask(task.id)}>
                  <FontAwesomeIcon icon={faTrash} className="text-red-500 hover:text-red-600" />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TaskList;

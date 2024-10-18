'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { saveAs } from 'file-saver';
import { GET_TASKS } from '@/graphql/queries';
import { ADD_TASK, TOGGLE_TASK, DELETE_TASK, UPDATE_TASK } from '@/graphql/mutations';
import { Task } from '@/types';
import TaskList from '@/components/TaskList';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

export default function Home() {
  const { loading, error, data, refetch } = useQuery(GET_TASKS);
  const [addTask] = useMutation(ADD_TASK);
  const [toggleTask] = useMutation(TOGGLE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK); 
  const [updateTask] = useMutation(UPDATE_TASK); 
  
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'uncompleted'>('all');

  const handleAddTask = async () => {
    try {
      if (newTask.trim()) {
        await addTask({ variables: { title: newTask } });
        setNewTask('');
        refetch();
      }
    } catch (error) {
      console.error('Error adding new task: ', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast.error(`Error: ${errorMessage}`);
    }
  };

  const handleToggleComplete = async (taskId: number, completed: boolean) => {
    try {
      await toggleTask({ variables: { id: taskId, completed: !completed } });
      toast.success('The task status updated!');
      refetch();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleUpdateTask = async (id: number, newTitle: string) => {
    try {
      await updateTask({ variables: { id, title: newTitle } }); 
      toast.success('The task title updated!');
      refetch(); 
    } catch (error) {
      console.error('Error updating task title:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask({ variables: { id } });
    toast.success('The task removed!');
    refetch();
  };

  const filteredTasks = data?.tasks.filter((task: Task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'uncompleted') return !task.completed;
    return true;
  });

  const generateCSV = () => {
    if (!data || !data.tasks) {
      return;
    }

    const csvData = data.tasks.map((task: Task) => ({
      id: task.id,
      title: task.title,
      completed: task.completed ? 'Yes' : 'No',
      date_created: format(new Date(Number(task.date_created)), 'yyyy/MM/dd'),
    }));

    const csvContent = ["ID,Title,Completed,DateCreated", ...csvData.map((t: Task) => `${t.id},${t.title},${t.completed},${t.date_created}`)].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, "tasks.csv");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Add Task Form */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Add a new task</h1>
        <div className="flex items-center mb-4">
          <input
            className="border p-2 flex-1 mr-2 rounded text-gray-500"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New Task"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="task-list">
        <h1 className="text-2xl font-bold mb-2">Task list</h1>
        {/* Filter Buttons & CSV download */}
        <div className="flex items-center mb-4 button-group">
          <div className="flex-1">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 mr-2 rounded text-gray-500 ${filter === 'all' ? 'bg-blue-500' : 'bg-blue-200 hover:bg-blue-300'}`}>All</button>
            <button onClick={() => setFilter('completed')} className={`px-4 py-2 mr-2 rounded text-gray-500 ${filter === 'completed' ? 'bg-blue-500' : 'bg-blue-200 hover:bg-blue-300'}`}>Completed</button>
            <button onClick={() => setFilter('uncompleted')} className={`px-4 py-2 rounded text-gray-500 ${filter === 'uncompleted' ? 'bg-blue-500' : 'bg-blue-200 hover:bg-blue-300'}`}>Incompleted</button>
          </div>
          <button onClick={generateCSV} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Download CSV</button>
        </div>

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
        />
      </div>
    </div>
  );
}

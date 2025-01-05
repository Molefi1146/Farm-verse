import React, { useState } from 'react';
import { Clock, CheckCircle, AlertTriangle, Plus } from 'lucide-react';
import AddTaskModal from './AddTaskModal';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  assignee: string;
  projectId: string;
}

export default function TaskManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Soil Analysis',
      description: 'Conduct comprehensive soil analysis for new planting area',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-03-25',
      assignee: 'John Doe',
      projectId: '1'
    },
    {
      id: '2',
      title: 'Equipment Maintenance',
      description: 'Schedule regular maintenance for farming equipment',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2024-03-28',
      assignee: 'Jane Smith',
      projectId: '2'
    },
  ]);

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task = {
      ...newTask,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTasks([...tasks, task]);
    setIsModalOpen(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in-progress':
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Task Manager</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>New Task</span>
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                {getStatusIcon(task.status)}
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-3">{task.description}</p>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                <span>Assignee: {task.assignee}</span>
              </div>
              <button className="text-green-600 hover:text-green-700 font-medium">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
      />
    </div>
  );
}
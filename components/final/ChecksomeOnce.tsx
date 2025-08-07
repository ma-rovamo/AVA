import React, { useState } from 'react';
import { Sparkles, Clock, Filter } from 'lucide-react';

const Checksome = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Ensure Loan Application is...",
      address: "410 FLAGSHIP DR #501",
      date: "Today",
      label: "Loan Application Deadline",
      labelColor: "red",
      completed: false,
      category: "selling"
    },
    {
      id: 2,
      title: "Coordinate Home Inspection",
      address: "225 OCEAN BREEZE LN #H102",
      date: "Today",
      label: "Additional Deposit Deadline",
      labelColor: "red",
      completed: false,
      category: "buying"
    },
    {
      id: 3,
      title: "Prepare and Submit Buyer's Election...",
      address: "912 SUNSET HILL CT #409",
      date: "08/10/2025",
      label: "Inspection Period End Date",
      labelColor: "red",
      completed: false,
      category: "buying"
    },
    {
      id: 4,
      title: "Obtain Flood Insurance Disclosure",
      address: "407 COASTLINE ST #318",
      date: "08/10/2025",
      label: "Additional Deposit Deadline",
      labelColor: "red",
      completed: false,
      category: "selling"
    },
    {
      id: 5,
      title: "Prepare Bill of Sale",
      address: "688 BIRCHWOOD TRL #206",
      date: "08/10/2025",
      label: "Additional Deposit Deadline",
      labelColor: "red",
      completed: false,
      category: "buying"
    }
  ]);

  const [deadlines] = useState([
    {
      id: 1,
      title: "Additional Deposit Due Date",
      address: "407 COASTLINE ST #318",
      date: "08/10/2025",
      label: "3d",
      labelColor: "red"
    },
    {
      id: 2,
      title: "Inspection Period End Date",
      address: "912 SUNSET HILL CT #409",
      date: "08/10/2025",
      label: "3d",
      labelColor: "red"
    },
    {
      id: 3,
      title: "Buyer's Election Deadline",
      address: "688 BIRCHWOOD TRL #206",
      date: "08/10/2025",
      label: "6d",
      labelColor: "orange"
    },
    {
      id: 4,
      title: "Seller's Response Deadline",
      address: "688 BIRCHWOOD TRL #206",
      date: "08/10/2025",
      label: "6d",
      labelColor: "orange"
    },
    {
      id: 5,
      title: "Financing Contingency Deadline",
      address: "410 FLAGSHIP DR #501",
      date: "08/10/2025",
      label: "8d",
      labelColor: "green"
    }
  ]);

  const [activeTaskTab, setActiveTaskTab] = useState("upcoming");
  const [activeDeadlineTab, setActiveDeadlineTab] = useState("upcoming");

  const handleTaskToggle = (taskId:any) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getBadgeColor = (color:any) => {
    switch (color) {
      case 'red':
        return 'bg-red-100 text-red-600 border-red-200';
      case 'orange':
        return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'green':
        return 'bg-green-100 text-green-600 border-green-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getCategoryColor = (category:any) => {
    switch (category) {
      case 'selling':
        return 'bg-orange-100 text-orange-600';
      case 'buying':
        return 'bg-teal-100 text-teal-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* My Tasks Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">My Tasks</h2>
              </div>
              <Filter className="h-4 w-4 text-blue-400" />
            </div>
            
            <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
              <button
                onClick={() => setActiveTaskTab("upcoming")}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTaskTab === "upcoming"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTaskTab("overdue")}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTaskTab === "overdue"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Overdue
              </button>
            </div>
          </div>

          <div className="px-6 pb-6">
            {activeTaskTab === "upcoming" ? (
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <div key={task.id} className={`flex items-start space-x-3 ${index !== tasks.length - 1 ? 'pb-4 border-b border-gray-100' : ''}`}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleTaskToggle(task.id)}
                      className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className={`text-sm font-medium ${
                          task.completed ? "line-through text-gray-500" : "text-gray-900"
                        }`}>
                          {task.title}
                        </h4>
                        <span className="text-xs text-blue-600 font-medium ml-4 flex-shrink-0">
                          {task.date}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {task.address}
                      </p>
                      <div className="flex items-center  justify-between space-x-2">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getCategoryColor(task.category)}`}>
                          {task.category}
                        </span>
                     

                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getBadgeColor(task.labelColor)}`}>
                          {task.label}
                        </span>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No overdue tasks
              </div>
            )}
          </div>
        </div>

        {/* My Deadlines Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">My Deadlines</h2>
              </div>
              <Filter className="h-4 w-4 text-blue-400" />
            </div>
            
            <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
              <button
                onClick={() => setActiveDeadlineTab("upcoming")}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeDeadlineTab === "upcoming"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveDeadlineTab("overdue")}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors relative ${
                  activeDeadlineTab === "overdue"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Overdue
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                  13
                </span>
              </button>
            </div>
          </div>

          <div className="px-6 pb-6">
            {activeDeadlineTab === "upcoming" ? (
              <div className="space-y-4">
                {deadlines.map((deadline, index) => (
                  <div key={deadline.id} className={`flex items-start space-x-3 ${index !== deadlines.length - 1 ? 'pb-4 border-b border-gray-100' : ''}`}>
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {deadline.title}
                        </h4>
                        <span className="text-xs text-gray-500 ml-4 flex-shrink-0">
                          {deadline.date}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {deadline.address}
                      </p>
                      <span className={`inline-block px-2 py-1 float-end text-xs font-medium rounded border ${getBadgeColor(deadline.labelColor)}`}>
                        {deadline.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                13 overdue items
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checksome;
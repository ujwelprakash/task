const TaskItem = ({ task, onDelete, onEdit }) => {
  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p className="text-sm text-gray-500">
        Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'}
      </p>
      <p className={`text-sm ${task.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>
        {task.status}
      </p>

      {/* ✅ Display Uploaded Image (If Available) */}
      {task.imageUrl && (
        <div className="mt-2">
          <img src={task.imageUrl} alt="Task Upload" className="w-full h-32 object-cover rounded" />
        </div>
      )}

      {/* ✅ Display Image Files (JPEG, PNG, GIF) */}
      {task.fileUrl && task.fileUrl.match(/\.(jpeg|jpg|png|gif)$/) && (
        <div className="mt-2">
          <img
            src={task.fileUrl}
            alt="Uploaded file"
            className="w-full h-32 object-cover rounded"
          />
        </div>
      )}

      {/* ✅ Display Other File Types as Download Links */}
      {task.fileUrl && !task.fileUrl.match(/\.(jpeg|jpg|png|gif)$/) && !task.imageUrl && (
        <div className="mt-2">
          <a
            href={task.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View Attached File
          </a>
        </div>
      )}

      <div className="flex gap-2 mt-2">
        <button onClick={() => onEdit(task)} className="bg-yellow-500 text-white px-2 py-1 rounded">
          Edit
        </button>
        <button onClick={() => onDelete(task._id)} className="bg-red-500 text-white px-2 py-1 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;



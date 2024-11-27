interface TaskHeaderProps {
  title: string
  showDeleteButton: boolean
  onDeleteAll: () => void
}

const TaskHeader = ({ title, showDeleteButton, onDeleteAll }: TaskHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-accent">{title}</h2>
      {showDeleteButton && (
        <button
          onClick={onDeleteAll}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
        >
          Tout supprimer
        </button>
      )}
    </div>
  )
}

export default TaskHeader 
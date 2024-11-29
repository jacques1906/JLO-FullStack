interface TaskTagProps {
  name: string;
  description?: string;
}

const TaskTag = ({ name, description }: TaskTagProps) => {
  return (
    <div 
      className="px-2 py-1 bg-accent/10 text-accent rounded text-sm"
      title={description || ''}
    >
      {name}
    </div>
  )
}

export default TaskTag; 
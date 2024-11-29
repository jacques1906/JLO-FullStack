interface TaskTagProps {
  name: string;
}

const TaskTag = ({ name }: TaskTagProps) => {
  return (
    <span className="inline-block bg-accent/20 text-accent text-sm px-2 py-1 rounded-full">
      {name}
    </span>
  );
};

export default TaskTag; 
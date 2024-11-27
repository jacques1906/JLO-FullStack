interface NotificationProps {
  message: string
  onClose: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const Notification = ({ 
  message, 
  onClose, 
  onMouseEnter, 
  onMouseLeave 
}: NotificationProps) => {
  return (
    <div 
      className="group fixed top-4 right-4 bg-accent text-background px-6 py-3 rounded-lg shadow-lg flex items-center gap-4"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute bottom-0 left-0 w-full h-1 bg-background/20 rounded-b-lg overflow-hidden">
        <div className="w-full h-full bg-background/40 animate-progress group-hover:animation-paused" />
      </div>
      <span>{message}</span>
      <button 
        onClick={onClose}
        className="hover:opacity-80"
      >
        ✕
      </button>
    </div>
  )
}

export default Notification 
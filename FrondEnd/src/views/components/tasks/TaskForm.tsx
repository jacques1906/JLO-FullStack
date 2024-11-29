import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_TAGS } from '../../../hooks/useGraphQL'
import { useTagMutations } from '../../../hooks/useGraphQL'

interface TaskFormProps {
  onSubmit: (title: string, description: string, tagIds: string[]) => void
}

const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const [newTask, setNewTask] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [selectedTagId, setSelectedTagId] = useState<string>('')
  
  const { data: tagsData, refetch: refetchTags } = useQuery(GET_TAGS)
  const { createTag, deleteTag } = useTagMutations()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return

    let finalTagId = selectedTagId
    if (tagInput.trim() && !selectedTagId) {
      try {
        const newTag = await createTag(tagInput.trim())
        finalTagId = newTag.id
        await refetchTags()
      } catch (error) {
        console.error('Erreur lors de la création du tag:', error)
      }
    }

    onSubmit(newTask.trim(), taskDescription.trim(), finalTagId ? [finalTagId] : [])
    setNewTask('')
    setTaskDescription('')
    setTagInput('')
    setSelectedTagId('')
  }

  const handleDeleteTag = async (tagId: string) => {
    try {
      await deleteTag(tagId)
      await refetchTags()
    } catch (error) {
      console.error('Erreur lors de la suppression du tag:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-text mb-1">Description:</label>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Titre de la tâche..."
            className="px-4 py-3 rounded-lg bg-tertiary text-text placeholder-text/50 border-2 border-accent/20 focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-text mb-1">Description détaillée:</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Description de la tâche (optionnel)..."
            className="px-4 py-3 rounded-lg bg-tertiary text-text placeholder-text/50 border-2 border-accent/20 focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none resize-none h-24"
          />
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => {
              setTagInput(e.target.value)
              setSelectedTagId('')
            }}
            placeholder="Nouveau tag..."
            className="flex-1 px-4 py-3 rounded-lg bg-tertiary text-text placeholder-text/50 border-2 border-accent/20 focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none"
          />
          <div className="relative flex-1">
            <select
              value={selectedTagId}
              onChange={(e) => {
                setSelectedTagId(e.target.value)
                setTagInput('')
              }}
              className="w-full px-4 py-3 rounded-lg bg-tertiary text-text border-2 border-accent/20 focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none appearance-none"
            >
              <option value="">Choisir un tag existant</option>
              {tagsData?.tags.map((tag: { id: string, name: string }) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
            <div className="absolute right-0 top-0 h-full flex items-center pr-2">
              {selectedTagId && (
                <button
                  type="button"
                  onClick={() => handleDeleteTag(selectedTagId)}
                  className="text-red-500 hover:text-red-600 px-2"
                >
                  ×
                </button>
              )}
            </div>
          </div>
          <button 
            type="submit"
            className="px-6 py-3 bg-accent text-background font-medium rounded-lg"
          >
            Ajouter
          </button>
        </div>
      </div>
    </form>
  )
}

export default TaskForm 
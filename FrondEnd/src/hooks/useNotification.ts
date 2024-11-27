import { useState, useCallback, useRef } from 'react'

export const useNotification = () => {
  const [notification, setNotification] = useState<string | null>(null)
  const timeoutRef = useRef<number>()

  const showNotification = useCallback((message: string) => {
    setNotification(message)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => {
      setNotification(null)
    }, 3000)
  }, [])

  const hideNotification = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setNotification(null)
  }, [])

  const pauseNotificationTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const resumeNotificationTimer = useCallback(() => {
    if (notification) {
      timeoutRef.current = window.setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }, [notification])

  return {
    notification,
    showNotification,
    hideNotification,
    pauseNotificationTimer,
    resumeNotificationTimer
  }
} 
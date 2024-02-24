import React, {useEffect} from 'react'
import toast from 'react-hot-toast'

const NotFound = () => {
  useEffect(() => {
    toast.error('Page Not Found', { duration: 2000 })
  }, [])

  return (
    <div>NotFound Page</div>
  )
}

export default NotFound
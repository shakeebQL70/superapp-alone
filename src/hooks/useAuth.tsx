import React from 'react'
import { useUserStore } from '../Store/store'

const useAuth = () => {
  const user = useUserStore((state: any) => state.user)

  return !!user?.email
}

export default useAuth
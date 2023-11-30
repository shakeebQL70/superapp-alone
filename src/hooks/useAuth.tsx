import React from 'react'
import { useUserStore } from 'SUPER/store'

const useAuth = () => {
  const user = useUserStore((state: any) => state.user)

  return !!user?.email
}

export default useAuth
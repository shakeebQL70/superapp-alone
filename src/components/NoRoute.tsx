import React from 'react'
import { Navigate } from 'react-router-dom'

const NoRoute = ({url} : {url: string}) => <Navigate to={url} />
export default NoRoute
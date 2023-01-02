import { Navigate, Outlet } from 'react-router-dom'

const UserPrivateRoutes = () => {
  if(localStorage.getItem('token')) {var token = true}
  if(localStorage.getItem('role')) {var role = true}
  if(localStorage.getItem('username')) {var username = true}

  const url = `/${localStorage.getItem('role')}`

  return (
    (!token || !role || !username) ? <Outlet/> : <Navigate to={url}/>
  )
}

export default UserPrivateRoutes;
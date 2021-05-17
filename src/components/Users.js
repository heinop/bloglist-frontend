import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch((initializeUsers()))
  },[])

  return (
    <div>
      <h3>Users</h3>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map(user =>
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>)}
      </table>
    </div>
  )
}

export default Users
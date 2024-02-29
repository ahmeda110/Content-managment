import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'


import useAuth from "../../hooks/useAuth"
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid';
import renderCell, { Button } from '@mui/material'
import Edit from '@mui/icons-material/Edit'
import { EditNote } from "@mui/icons-material";

import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
//import { selectTaskById } from './tasksApiSlice'


const UsersList = () => {
  const navigate = useNavigate()
  const handleEdit = (params) => navigate(`/dash/users/${params}`)

  const { username, _id, isManager, isAdmin } = useAuth()

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {

    const { ids, entities } = users
        const rows = []
        Object.keys(entities).forEach((val) => {
          if(entities[val].username === username)
            rows.push(
              {
                id: entities[val].id,
                username: entities[val].username,
                roles: entities[val].roles,
                email: entities[val].email,
                edit: entities[val]
              }
            )
        })

      const columns = [
        {field: 'username', headerName: 'Username', width: 150, editable: false},
        {field: 'email', headerName: 'Email', width: 150, editable: false},
        {field: 'roles', headerName: 'Roles', width: 150, editable: false},
        {field: 'edit', headerName: 'Edit', sortable: 'false', editable: false,
        renderCell: (params) => {
            return (
                <Button
                onClick={() => {
                    console.log(params)
                    handleEdit(params.id)
                }}>
                    Edit User
                </Button>
            )
        }
        }
        
      ]

    let filteredIds
    if (isManager || isAdmin) {
      filteredIds = [...ids]
    } else {
      filteredIds = ids.filter(userId => entities[userId].owner === username)
    }

    const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)

    content = (
      <Box
      sx={{ height: 400, width: '80%', marginLeft: '1%', marginTop: '1%' }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
          pagination: {
            paginationModel: {
            pageSize: 5,
            },
          },
          }}
          
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          />
      </Box>
      /*
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">Username</th>
            <th scope="col" className="table__th">Email</th>
            <th scope="col" className="table__th user__roles">Roles</th>
            <th scope="col" className="table__th user__edit">Edit</th>
            <th scope="col" className="table__th user__edit">id</th>
            <th scope="col" className="table__th user__edit">owner</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
      */
    )
  }

  return content
}
export default UsersList
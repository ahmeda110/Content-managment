import { useGetTasksQuery } from "./tasksApiSlice"
import Task from "./Task"
import useAuth from "../../hooks/useAuth"
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid';
import renderCell, { Button } from '@mui/material'
import Edit from '@mui/icons-material/Edit'
import { EditNote } from "@mui/icons-material";

import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectTaskById } from './tasksApiSlice'


const TasksList = () => {
    const navigate = useNavigate()
    const handleEdit = (params) => navigate(`/dash/tasks/${params}`)

    const { username, _id, isManager, isAdmin } = useAuth()
    //console.log(_id)
    const {
        data: tasks,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTasksQuery('tasksList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids, entities } = tasks
        const rows = []
        Object.keys(entities).forEach((val) => {
            if(entities[val].username === username)
                rows.push(
                    {
                        id: entities[val].id,
                        username: entities[val].username,
                        createdAt: new Date(entities[val].createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' }),
                        updatedAt: new Date(entities[val].updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' }),
                        title: entities[val].title,
                        completed: entities[val].completed ? "Completed" : "Open",
                        edit: entities[val]
                    }
                )
        })


        const columns = [
            {field: 'title', headerName: 'Title', width: 150, editable: false},
            {field: 'username', headerName: 'Username', width: 150, editable: false},
            {field: 'updatedAt', headerName: 'Updated', width: 150, editable: false},
            {field: 'createdAt', headerName: 'Created', width: 150, editable: false},
            {field: 'edit', headerName: 'Edit', sortable: 'false', editable: false,
            renderCell: (params) => {
                return (
                    <Button
                    onClick={() => {
                        console.log(params)
                        handleEdit(params.id)
                    }}>
                        Edit Task
                    </Button>
                )
            }
            }
            
        ]

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(taskId => entities[taskId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(taskId => <Task key={taskId} taskId={taskId} />)

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
            <table className="table table--tasks">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th task__status">Username</th>
                        <th scope="col" className="table__th task__created">Created</th>
                        <th scope="col" className="table__th task__updated">Updated</th>
                        <th scope="col" className="table__th task__title">Title</th>
                        <th scope="col" className="table__th task__username">Owner</th>
                        <th scope="col" className="table__th task__edit">Edit</th>
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
export default TasksList
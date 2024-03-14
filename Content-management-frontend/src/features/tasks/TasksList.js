import { useGetTasksQuery } from "./tasksApiSlice"
import Task from "./Task"
import useAuth from "../../hooks/useAuth"
import Box from '@mui/material/Box'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import renderCell, { Button, Menu } from '@mui/material'
import Edit from '@mui/icons-material/Edit'
import { EditNote } from "@mui/icons-material";

import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectTaskById } from './tasksApiSlice'


const TasksList = () => {
    const navigate = useNavigate()
    const handleEdit = (params) => navigate(`/dash/tasks/${params}`)

    const { username, isManager, isAdmin } = useAuth()
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

    /*
    const handleChange = (e) => {
        const {
            target: { value },
        } = e;
        setTask(
            typeof value == 'string' ? value.split(',') : value,
            //console.log(value)
        );
    };

    const options = Object.values(ROLES).map(role => {
        return (
            <MenuItem
            sx={{ minWidth: 120, minHeight: 80 }}
            key={role}
            value={role}
            > {role}</MenuItem >
        )
    })
    */
    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids, entities } = tasks
        const rows = []
        Object.keys(entities).forEach((val) => {
            if (entities[val].username === username || entities[val].owner === username)
                rows.push(
                    {
                        id: entities[val].id,
                        title: entities[val].title,
                        username: entities[val].username,
                        country: entities[val].country,
                        website: entities[val].webUrl,
                        status: entities[val].status,
                        keywords: entities[val].keywords,
                        sKeywords: entities[val].sKeywords,
                        dueDate: entities[val].dueDate,
                        edit: entities[val]
                        /*
                        id: entities[val].id,
                        username: entities[val].username,
                        createdAt: new Date(entities[val].createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' }),
                        updatedAt: new Date(entities[val].updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' }),
                        title: entities[val].title,
                        completed: entities[val].completed ? "Completed" : "Open",
                        edit: entities[val]
                        */
                    }
                )
        })


        const columns = [
            { field: 'title', headerName: 'Title', width: 150, editable: false },
            { field: 'username', headerName: 'Username', width: 150, editable: false },
            { field: 'country', headerName: 'Country', width: 150, editable: false },
            { field: 'website', headerName: 'Website', width: 150, editable: false },
            { field: 'status', headerName: 'Status', width: 150, editable: false },
            { field: 'keywords', headerName: 'Keywords', width: 150, editable: false },
            { field: 'sKeywords', headerName: 'SKeywords', width: 150, editable: false },
            { field: 'dueDate', headerName: 'Due Date', width: 150, editable: false }
            /*
            { field: 'title', headerName: 'Title', width: 150, editable: false },
            { field: 'username', headerName: 'Username', width: 150, editable: false },
            { field: 'updatedAt', headerName: 'Updated', width: 150, editable: false },
            { field: 'createdAt', headerName: 'Created', width: 150, editable: false },
            {
                field: 'edit', headerName: 'Edit', sortable: 'false', editable: false,
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
            */

        ]
        


        content = (
            <Box
            sx={{ height: 400, width: '80%', marginLeft: '1%', marginTop: '1%' }}
            >
                {(isManager || isAdmin) && 
                <FormControl fullWidth>
                    <InputLabel>Assign to</InputLabel>
                    <Select
                    label="Assign to"
                    //id="roles"
                    //name="roles"
                    //multiple
                    //value={tasks}
                    //onChange={handleChange}
                    MenuProps={{
                        PaperProps: {
                            style: {
                            maxHeight: 180,
                            width: 210,
                            },
                        },
                    }}
                    >
                        {/*options*/}
                        <MenuItem> User 1</MenuItem>
                    </Select>
                    <Button>
                        Assign
                    </Button>
                </FormControl>}
                <DataGrid
                    rows={rows}
                    columns={columns}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    initialState={{
                    filter: {
                        filterModel: {
                            items: [{ field: 'username' }],
                        },
                    },
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
            
        )
    }

    return content
}
export default TasksList
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTaskById } from './tasksApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditTaskForm from './EditTaskForm'

const EditTask = () => {
    const { id } = useParams()

    const task = useSelector(state => selectTaskById(state, id))
    const users = useSelector(selectAllUsers)

    const content = task && users ? <EditTaskForm task={task} users={users} /> : <p>Loading...</p>

    return content
}
export default EditTask
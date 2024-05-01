import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import TasksList from './features/tasks/TasksList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditTask from './features/tasks/EditTask'
import NewTask from './features/tasks/NewTask'
import { CssBaseline, ThemeProvider  } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
//import AdminList from 
import AdminForm from './features/users/AdminForm'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'

function App() {

  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />

                {/* Protected Routes */}
                <Route element={<PersistLogin />}>
                  <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                    <Route element={<Prefetch />}>
                      <Route path="dash" element={<DashLayout />}>

                        <Route index element={<Welcome />} />

                        <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                          <Route path="users">
                            <Route index element={<UsersList />} />
                            <Route path=":id" element={<EditUser />} />
                            <Route path="new" element={<NewUserForm />} />
                          </Route>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                          <Route path="admin">
                            <Route index element={<AdminForm />} />
                            {/* <Route path="new" element={<NewUserForm />} /> */}
                          </Route>
                        </Route>

                        <Route path="tasks">
                          <Route index element={<TasksList />} />
                          <Route path=":id" element={<EditTask />} />
                          <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                            <Route path="new" element={<NewTask />} />
                          </Route>
                        </Route>

                      </Route>{/* End Dash */}
                    </Route>
                  </Route>
                </Route>{/* End Protected Routes */}
              </Route>
            </Routes >
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
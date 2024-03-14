import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const rolesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = rolesAdapter.getInitialState()

export const rolesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRoles: builder.query({
            query: () => '/admin',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedRoles = responseData.map(role => {
                    role.id = role._id
                    return role
                });
                return rolesAdapter.setAll(initialState, loadedRoles)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Role', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Role', id }))
                    ]
                } else return [{ type: 'Role', id: 'LIST' }]
            }
        }),
        addNewRole: builder.mutation({
            query: initialRole => ({
                url: '/admin',
                method: 'POST',
                body: {
                    ...initialRole,
                }
            }),
            invalidatesTags: [
                { type: 'Role', id: "LIST" }
            ]
        }),
        updateRole: builder.mutation({
            query: initialRole => ({
                url: '/admin',
                method: 'PATCH',
                body: {
                    ...initialRole,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Role', id: arg.id }
            ]
        }),
        deleteRole: builder.mutation({
            query: ({ id }) => ({
                url: `/admin`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Role', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetRolesQuery,
    useAddNewRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation,
} = rolesApiSlice

// returns the query result object
export const selectRolesResult = rolesApiSlice.endpoints.getRoles.select()

// creates memoized selector
const selectRolesData = createSelector(
    selectRolesResult,
    rolesResult => rolesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllRoles,
    selectById: selectRoleById,
    selectIds: selectRoleIds
    // Pass in a selector that returns the roles slice of state
} = rolesAdapter.getSelectors(state => selectRolesData(state) ?? initialState)
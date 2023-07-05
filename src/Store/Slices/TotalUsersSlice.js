import { createSlice } from "@reduxjs/toolkit"

const initialState = { totalUsers: [] }

const TotalUsersSlice = createSlice({
    name: "TotalUsers",
    initialState,

    reducers: {
        updateTotalUsers: {
            reducer: (state, action) => {
                try {
                    console.log("action", action.payload)
                    return state = { ...state, totalUsers: action.payload }
                }
                catch (err) {
                    console.log(err)
                }
            }
        },

        addToTotalUsers: {
            reducer: (state, action) => {
                try {
                    console.log("action", action.payload)
                    let existingUsers = [...state.totalUsers]
                    console.log("existingUsers>>>", existingUsers)
                    existingUsers.push(action.payload)
                    return state = { ...state, totalUsers: existingUsers }
                }
                catch (err) {
                    console.log(err)
                }
            }
        },

        resetTotalUsers(state) {
            return state = initialState
        }


        // logoutUser(state) {
        //     return state = initialState
        // }

    },


})

export const { updateTotalUsers, addToTotalUsers, resetTotalUsers } = TotalUsersSlice.actions

export default TotalUsersSlice.reducer
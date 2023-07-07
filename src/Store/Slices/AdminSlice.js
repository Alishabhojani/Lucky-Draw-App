import { createSlice } from "@reduxjs/toolkit"

const initialState = {admin: false}

const AdminSlice = createSlice({
    name: "AdminSlice",
    initialState,

    reducers: {
        logoutAdmin: {
            reducer: (state, action) => {
                try {
                    console.log(action.payload)
                    return state = initialState
                }
                catch (err) {
                    console.log(err)
                }
            }
        },
        loginAdmin: {
            reducer: (state, action) => {
                try {
                    console.log(action.payload)
                    return state = {...action.payload, admin: true }
                }
                catch (err) {
                    console.log(err)
                }
            }
        },
    },


})

export const { logoutAdmin, loginAdmin } = AdminSlice.actions

export default AdminSlice.reducer
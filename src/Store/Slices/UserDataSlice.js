import { createSlice } from "@reduxjs/toolkit"

const initialState = { user: false, code: null, codeMatched: false, }

const userData = createSlice({
    name: "user",
    initialState,

    reducers: {
        updateUser: {
            reducer: (state, action) => {
                try {
                    console.log(action.payload)
                    return state = { ...state, user: true, ...action.payload }
                }
                catch (err) {
                    console.log(err)
                }
            }
        },
        logoutUser: {
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
        addCode: {
            reducer: (state, action) => {
                try {
                    console.log(action.payload)
                    return state = { ...state, code: action.payload.code, codeMatched: action.payload.codeMatched }
                }
                catch (err) {
                    console.log(err)
                }
            }
        },


    },


})

export const { updateUser, logoutUser, addCode } = userData.actions

export default userData.reducer
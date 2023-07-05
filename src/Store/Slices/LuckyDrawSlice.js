import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    totalLuckyDraws: []
}

const LuckyDrawSlice = createSlice({
    name: "LuckyDraw",
    initialState,

    reducers: {
        startLuckyDraw: {
            reducer: (state, action) => {
                try {
                    console.log(action.payload)
                    return state = { ...state, luckyDrawMinutes: 1, startLuckyDraw: true }
                }
                catch (err) {
                    console.log(err)
                }
            }
        },
        endLuckyDraw: {
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
        startRegistrationAction: {
            reducer: (state, action) => {
                try {
                    console.log("startRegistrationAction Payload>>>", action.payload)
                    return state = { ...state, isRegistrationOpen: true }
                }
                catch (err) {
                    console.log(err)
                }
            }
        },
        endRegistrationAction: {
            reducer: (state, action) => {
                try {
                    console.log(action.payload)
                    return state = { ...state, isRegistrationOpen: false }
                }
                catch (err) {
                    console.log(err)
                }
            }
        },
        addNewLuckyDraw(state, action) {
            let existingLucyDraws = [...state.totalLuckyDraws]
            console.log(existingLucyDraws)
            existingLucyDraws.push(action.payload)
            return state = { ...state, totalLuckyDraws: existingLucyDraws }
        },
        updateTotalLuckyDraw(state, action) {   
            return state = { ...state, totalLuckyDraws: action.payload }
        },
        resetLuckyDraw(state) {
            return state = initialState
        }


        // logoutUser(state) {
        //     return state = initialState
        // }

    },


})

export const { updateTotalLuckyDraw, startLuckyDraw, endLuckyDraw, startRegistrationAction, endRegistrationAction, addNewLuckyDraw, resetLuckyDraw } = LuckyDrawSlice.actions

export default LuckyDrawSlice.reducer
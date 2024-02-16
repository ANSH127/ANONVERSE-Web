import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state


// Define the initial state using that type
const initialState = {
    user: null,
    avtar: 0,
    AvtarList: []
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setAvtar: (state, action) => {
            state.avtar = action.payload
        },
        setAvtarList: (state, action) => {
            state.AvtarList = action.payload
        }




    },
})

export const { setUser, setAvtar,setAvtarList } = userSlice.actions


export default userSlice.reducer
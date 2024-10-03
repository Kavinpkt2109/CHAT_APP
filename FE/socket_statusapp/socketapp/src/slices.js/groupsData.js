import { createSlice } from "@reduxjs/toolkit";

const groupsData = createSlice({
    name: "groupsData",
    initialState: [],
    reducers: {
        updateGroupsData(state, action) {
            console.log("update the state");
            return action.payload
        }
    }
})

export default groupsData.reducer
export const { updateGroupsData } = groupsData.actions
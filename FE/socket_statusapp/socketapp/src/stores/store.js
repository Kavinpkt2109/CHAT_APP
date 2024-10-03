import { configureStore} from '@reduxjs/toolkit'
import updateGroupsData from '../slices.js/groupsData'
export const  store= configureStore({
    devTools:true,
    reducer:{
        groupsData: updateGroupsData
    }
})

  

import { createSlice } from '@reduxjs/toolkit';

interface UIState {
    isCollapsed: boolean;
    isDrawerOpen: boolean;
    openKeys: string[];
}

const initialState: UIState = {
    isCollapsed: false,
    isDrawerOpen: false,
    openKeys: [],
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsCollapsed(state, action) {
            // console.log('setIsCollapsed', action.payload);
            state.isCollapsed = action.payload;
        },
        setIsDrawerOpen(state, action) {
            // console.log('setIsDrawerOpen', action.payload);
            state.isDrawerOpen = action.payload;
        },
        setOpenKeys(state, action) {
            // console.log('setOpenKeys', action.payload);
            state.openKeys = action.payload;
        }
    },
});

export const { setIsCollapsed, setIsDrawerOpen, setOpenKeys} = uiSlice.actions;
export default uiSlice.reducer;

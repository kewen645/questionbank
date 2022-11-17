import { createSlice } from "@reduxjs/toolkit"

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    alertType: 'success',
    alertContent: 'message',
    isShown: false
  },
  reducers: {
    'showAlert': (state, action) => {
      const { payload } = action
      state.isShown = true
      state.alertType = payload.alertType
      state.alertContent = payload.alertContent
    },
    'hideAlert': (state) => {
      state.isShown = false
    }
  }
})

export const { showAlert, hideAlert } = alertSlice.actions

export default alertSlice.reducer
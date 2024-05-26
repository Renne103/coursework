import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from './types'

interface State {
  user: User | null
}

const initialState: State = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },

    deleteUser(state) {
      state.user = null
    },
  },
  selectors: {
    getUser: state => state.user
  },
})

export const { addUser, deleteUser } = userSlice.actions
export const { getUser } = userSlice.selectors
export const userReducer = userSlice.reducer

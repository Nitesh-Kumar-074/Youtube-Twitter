import {configureStore} from '@reduxjs/toolkit'
import AuthSliceReducer from './authSlice.js'
const store = configureStore(
       {
              reducer : {
                     AuthSlice : AuthSliceReducer
              }
       }
)

export {store} 
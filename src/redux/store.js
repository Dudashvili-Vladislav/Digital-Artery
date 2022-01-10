import { createStore, combineReducers } from 'redux'
import { currentImage } from './reducers/image'
import { setUser } from './reducers/setUser'


const rootReducer = combineReducers({
    user: setUser,
    image: currentImage
})


export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


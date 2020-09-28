import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../Reducers';


export const configureStore = (initialState) =>  {
    const middleware = [thunk];
    const store = createStore(
        reducer,
        initialState,
        applyMiddleware(...middleware)
    );
    return store;
}
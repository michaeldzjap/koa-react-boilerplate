import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger());
}

/**
 * Configure the Redux store.
 *
 * @param Object initialState
 */
const configureStore = (initialState: Object) => {
    const store = createStore(reducers, initialState, applyMiddleware(...middleware));

    if (module.hot) {
        // Enable HMR for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};

export default configureStore;

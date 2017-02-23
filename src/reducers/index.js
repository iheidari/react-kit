// // Set up your root reducer here...
// import { combineReducers } from 'redux';

// function mainReducer(state = {}, action) {
//     switch (action.type) {
//         case "form":
//             return { ...state, [action.payload.name]: action.payload.value };
//         default:
//             return state;
//     }
// }
// const rootReducer = combineReducers({ mainReducer });
// export default rootReducer;


import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
    form: formReducer,
    routing: routerReducer,
});

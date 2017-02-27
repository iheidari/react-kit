import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

function formReducer(state = {}, action) {
    switch (action.type) {
        case "FORM":
            return {
                ...state, value: {
                    ...state.value, [action.fieldName]: action.value
                },
                error: {
                    ...state.error, [action.fieldName]: action.error
                }
            };
        case "FORM_ERROR":
            return {
                ...state, error: {
                    ...state.error, [action.fieldName]: action.error
                }
            };
        case "VALIDATE":
            return {
                ...state, validator: action.validate
            };
        default:
            return state;
    }
}
export default combineReducers({
    form: formReducer,
    routing: routerReducer,
});

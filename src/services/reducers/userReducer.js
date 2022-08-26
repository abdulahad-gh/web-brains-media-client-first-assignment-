import { ADD_NOTE, ADD_TOPIC, CREATE_SUBJECT, REQUEST_FAILED } from "../constants/userConstants";

const initState = {
    subjects: [],
    topics: [],
    notes: [],
    isLoading: false,
    error: null,
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE_SUBJECT:
            return {
                ...state,
                isLoading: false,
                subjects: action.payload,
                error: null

            }
        case ADD_TOPIC:
            return {
                ...state,
                isLoading: false,
                topics: action.payload,
                error: null

            }

        case ADD_NOTE:
            return {
                ...state,
                isLoading: false,
                notes: action.payload,
                error: null

            }
        case REQUEST_FAILED:
            return {
                isLoading: false,
                subjects: [],
                topics: [],
                notes: [],
                error: action.payload,

            }



        default:
            return state;
    }
}

export default userReducer;
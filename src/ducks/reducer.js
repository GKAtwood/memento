const initialState = {
    user: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        isLoggingOut: false
    } 
    
};

const LOGIN = 'LOGIN';
const LOGGED_OUT = "LOGGED_OUT"
const LOG_OUT = "LOG_OUT"


export const login = (user) => {
    return {
        type: LOGIN, 
        payload: user
    }
}
export function logOut(){
    return{
        type: LOG_OUT,
    }
}
export function loggedOut() {
    return {
        type: LOGGED_OUT
    }
}


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case LOGIN: 
            return {...state, user: action.payload};
            case LOG_OUT:
                return {...state, isLoggingOut: true}
    
            case LOGGED_OUT:
                return {...initialState} 
        default: 
            return state;
    }
};

export default reducer;
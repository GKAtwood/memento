const initialState = {
    
    user: {
        uid: 0,
        firstName: '',
        lastName: '',
        city: '',
        Country: '',
        email: '',
        password: '',
        pic: ''
    }
};

const LOGIN = 'LOGIN';


export const login = (user) => {
    return {
        type: LOGIN, 
        payload: user
    }
}


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case LOGIN: 
            return {...state, user: action.payload};
        default: 
            return state;
    }
};

export default reducer;
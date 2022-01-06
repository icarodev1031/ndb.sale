
export const setCurrentAuthInfo = authInfo => dispatch => {
    dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
            isAuthenticated: true,
            user: authInfo
        }
    });
};
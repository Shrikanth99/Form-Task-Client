const initialState = { forms : [] }

export const formsReducer = (state=initialState,action) => {
    switch(action.type){
        case 'LIST' : {
            return { ...state , forms : action.payload }
        }
        default : {
            return {...state}
        }
    }

}
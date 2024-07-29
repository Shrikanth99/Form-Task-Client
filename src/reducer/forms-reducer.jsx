const initialState = { forms : [] }

export const formsReducer = (state=initialState,action) => {
    switch(action.type){
        case 'LIST' : {
            return { ...state , forms : action.payload }
        }
        case 'DEL_FORM' : {
            return { ...state, forms : state.forms.filter(el => el._id !== action.payload) }
        }
        default : {
            return {...state}
        }
    }

}
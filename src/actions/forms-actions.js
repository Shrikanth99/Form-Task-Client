import axios from '../config/axios'

export const startGetAllForms = () => {
    return async(dispatch) => {
        try {
            const res = await axios.get('/form/list')
            console.log('res',res.data)
            dispatch(setAllForms(res.data))
        } catch (e) {
            
        }
    }
}

const setAllForms = (data) => {
    return { type : 'LIST' , payload : data }
}

export const  startSetInput = (formData) => {
    return async(dispatch) => {
        try {
            const res = await axios.put('/form/input',formData)
            alert('submitted')
            
        } catch (e) {
            console.log(e.message)
        }
    }
}
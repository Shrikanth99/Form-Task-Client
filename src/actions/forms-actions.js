import { act } from 'react'
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
            alert(`${e.message}`)
            // console.log(e.message)
        }
    }
}

export const startDeleteForm = (id) => {
    return async(dispatch) => {
        try {
            const delRes = await axios.delete(`/form/remove/${id}` )
            dispatch(deleteForm(delRes.data._id))
        } catch (e) {
            alert(`${e.message}`)
        }
    }
}

const deleteForm = (id) => {
    return { type : 'DEL_FORM', payload:id }
}
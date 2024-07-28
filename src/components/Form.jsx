import React , {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { startSetInput } from '../actions/forms-actions'
import '../styles/createForm.css'

const Form = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [temp,setTemp] = useState({})
    // console.log('id',id)
    const forms = useSelector( state => state.forms.forms)
    console.log('forms',forms)

    const myForm = forms?.find(el => el._id === id)
    console.log('lav',temp)
 
    // console.log('single-form',myForm)
    // const formArr = [form]
    // console.log('formArr',formArr)
    const arr = []
    if(forms?.length){

       for(let key in myForm){
            if(myForm[key].length > 0){
                // console.log('dsd',myForm[key])
                if(typeof(myForm[key]) === 'object'){

                    arr.push(myForm[key])
                }
            }
        }
    }
    const newArr = arr.flat(1) 
    console.log('newArr',newArr) 

    const handleChange = (e,id) =>{
        const temp2 = {...temp}
        console.log('sas',id)
        for(let key in temp){
            if(Array.isArray(temp[key])){
                temp2[key] = temp[key].map(ele =>{
                    if(ele._id == id){
                        // setTemp({...temp2,key:})
                        // temp2 = {...temp2,key:temp2[key].map(ele2 => {
                        //     if(ele2._id == id){

                        //     }
                        // })}
                        return {...ele,value:e.target.value}

                    }
                    return ele
                })
                
            }
        }
        // console.log('sdc',temp2)
        setTemp(temp2)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log('aqsw',temp)
        dispatch(startSetInput(temp))
        alert('Form submitted')
        navigate('/')
        
    }

    useEffect(()=>{
        if(forms){
            setTemp(myForm)
        }
    },[forms])

  return (
    <div style={{maxWidth:'60vw',margin:'0 auto',paddingTop:'2rem'}}>
    <div style={{border:'1px solid grey',display:'flex',flexDirection:'column',gap:'1.5rem',alignItems:'center',padding:'1.5rem 0'}}>
      <h2>{myForm?.title}</h2>
      
      <form style={{width:'60%',}} onSubmit={handleSubmit}>
        <div className='grid'>
        { newArr?.map((el,i) => {
            return (
                <div key={i}>
                    <label htmlFor="">{el.label}</label><br />
                    <input style={{borderColor:'transparent transparent black transparent'}} type={el.inputType} onChange={(e)=>handleChange(e,el._id)} />
                </div>
            )
        }) }
        </div>
       <div style={{display:'flex'}}>

        <input style={{padding:'0.5rem 0.5rem',backgroundColor:'green',color:'white',cursor:'pointer', borderRadius : '0.5rem', margin:'0 auto',textAlign:'center' }} type="submit"/>
       </div>
       
      </form>
      
    </div>
    </div>
  )
}

export default Form

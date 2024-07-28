import React, { useState } from 'react'
// import '../styles/createForm.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../styles/createForm.css'
const CreateForm = () => {
    const navigate = useNavigate()
    const [edit,setEdit] = useState(false)
    const [btnComp,setBtnComp] = useState(false)
    const [msg,setMsg] = useState('')
    const [formTitle,setFormTitle] = useState('Untitled Form')
    const [formInpTitle,setFormInpTitle] = useState('')
    const [formInpPlaceholder,setFormInpPlaceholder] = useState('')
    const [fields,setFields] = useState([])
    const [fieldId, setFieldId] = useState(-1)


    const handleTitle = () => {
        setFieldId(-1)
        setEdit(true)
        setMsg('title')

        // setFormTitle('')

    }


    const handleFormEdit = (input,id) => {

        setEdit(true)
        setFieldId(id)
        setFormInpTitle('')
        setFormInpPlaceholder('')
        setMsg('')
        console.log('IIIDDD',typeof(id), id)

    }

    const handleFormTitle = (e) => {
        if(msg === 'title'){

            setFormTitle(e.target.value)
        }
        else{
            const res = fields.map((ele,i) => {
                if(i == fieldId) return {...ele,label:e.target.value}
                return ele
            })
            setFields(res)
        }
        setFormInpTitle(e.target.value)
    }

    const handleFormPlaceholder = (e) => {
        const res = fields.map((ele,i) => {
            if(i == fieldId) return {...ele,placeholder:e.target.value}
            return ele
        })
        setFields(res)
        setFormInpPlaceholder(e.target.value)
    }

    const handleBtns = () => {
        setBtnComp(!btnComp)
    }

    const addInput = (type) => {
        // setEdit(true)
        setFields([...fields, { type, label :'' , placeholder : '' ,  } ])
    }

    const deleteInput = (id) => {
        const res = fields.filter( (input,i) => {
            return i !== id
        })
        setFields(res)
       if(res.length){
           setFormInpTitle('')
           setFormInpPlaceholder('')
           setEdit(false)
           setFieldId(-1)
       } 
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log('fields',{title : formTitle, fields})
        try{
            await axios.post('http://localhost:3017/form/create',{ title : formTitle, fields })
        }catch(e){
            console.log('err',e)
        }
        
    }

  return (
    <div className='form-container' style={{maxWidth:'60%',margin:'0 auto',padding:'3rem 0',display:'flex',flexDirection:'column',alignItems:'center',gap:'1.5rem'}}>{/*flex flex-col */}
      <h2>Create New Form</h2>
     
      {/* <div>
        <input type="text" name="" id="" />
      </div> */}
      <div className='form-inner' style={{display:'flex'}}>{/*flex */}
        <div style={{border:'1px solid grey',padding:'0.75rem 0',display:'flex',flexDirection:'column',alignItems:'center',width:'30vw',gap:'1rem'}}>
        <h2 style={{marginBottom:'2rem'}}>{formTitle}<button onClick={handleTitle} > ✏️</button></h2>
        
        { fields.map((input,i) => (
        <div key={i} >::
            <input style={{borderColor:'transparent transparent black transparent', borderRadius:'0.5rem',boxShadow:'5px 5px 10px #888888' }}  type={input.type} value={input.value} placeholder={input.label} readOnly />
            <button onClick={() => handleFormEdit(input,i) } >✏️</button>
            <button onClick={() => deleteInput(i) } >🗑</button>
        </div>
      ) ) }
        

        {btnComp ? <button style={{padding:'0.5rem',backgroundColor:'white', color:'blue',borderRadius:'0.5rem' }}   onClick={handleBtns} >Close Input</button> : <button style={{padding:'0.5rem',backgroundColor:'white', color:'blue', borderRadius:'0.5rem' }}  onClick={handleBtns} >Add Input</button> }

        { btnComp && (<div style={{display:'flex',gap:'1rem'}}>
        <button style={{padding:'0.5rem',backgroundColor:'#1876D2', color:'white', borderRadius : '0.5rem' }} onClick={() => addInput('text') } >Text</button>
        <button style={{padding:'0.5rem',backgroundColor:'#1876D2', color:'white', borderRadius : '0.5rem' }} onClick={() => addInput('number')} >Number</button>
        <button style={{padding:'0.5rem',backgroundColor:'#1876D2', color:'white', borderRadius : '0.5rem' }} onClick={() => addInput('email') } >  Email</button>
        <button style={{padding:'0.5rem',backgroundColor:'#1876D2', color:'white', borderRadius : '0.5rem' }} onClick={() => addInput('password') } >Password</button>
        <button style={{padding:'0.5rem',backgroundColor:'#1876D2', color:'white', borderRadius : '0.5rem' }} onClick={() => addInput('date') } >Date</button>
        </div>)
        }
     <button style={{padding:'0.5rem', backgroundColor:'#2E7D32', color:'white' , borderRadius : '0.5rem' }} onClick={handleSubmit} >Submit</button>
        </div>
        <div style={{border:'1px solid grey',width:'20vw',display:'flex',flexDirection:'column',alignItems:'center',padding:'0.75rem 0',gap:'0.8rem'}}>
            <h4>Form Editor</h4>
            { edit ? ( <> <label>Titile</label> <input type='text' value={formInpTitle}  onChange={handleFormTitle} style={{borderColor:'transparent transparent black transparent',borderRadius:'0.5rem',boxShadow:'5px 5px 10px #888888'}}/> </>): <p>click edit</p>
             }
            { fieldId >= 0 && (
                <div style={{display:'flex', flexDirection:'column' ,alignItems:'center'}} >
                    <label>PalceHolder</label><br />
                    <input style={{borderColor:'transparent transparent black transparent', borderRadius:'0.5rem',boxShadow:'5px 5px 10px #888888' }} type="text" value={formInpPlaceholder}  name=""  onChange={ handleFormPlaceholder} />
                </div>
            )   }

        </div>
       
      </div>
      <button style={{padding:'0.5rem', backgroundColor:'#2E7D32', color:'white' , borderRadius : '0.5rem' }} onClick={() => navigate('/')} >Create-Form</button>
    </div>
    
  )
}

export default CreateForm
//           <h2>{formTitle || 'Untitled Form'} <span className="edit-icon">✏️</span></h2>

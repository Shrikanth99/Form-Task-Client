import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
  const forms = useSelector(state => state.forms.forms)
  console.log(forms)

  return (
    <div style={{maxWidth:'60%',margin:'0 auto'}}>
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'1rem'}}>
       <h1>Welcome to Form.com</h1>
        <p>This is simple form builder</p>
        <button style={{padding:'0.5rem 0.5rem',backgroundColor:'green',cursor:'pointer', borderRadius : '0.5rem' }} ><Link style={{textDecoration:'none',color:'white'}} to="/create">CREATE NEW FORM</Link></button>
    </div>
    <hr style={{marginTop:'1rem'}} />
    <div>
        <h2 style={{margin:'1rem 0'}}>Forms</h2>
      <div style={{display:'flex',gap:'2rem'}}>
        {forms.map((el) => {
          return (<div key={el._id} style={{padding:'1rem 0.5rem 2rem 0.5rem',display:'flex',flexDirection:'column',gap:'0.5rem',width:'25%',borderRadius:'0.5rem',boxShadow:'5px 5px 10px #888888'}}>
            <h4 style={{textAlign:'center'}}>{el.title}</h4>
            <div style={{display:'flex',justifyContent:'space-between',padding:'0 2rem'}}>
            <Link style={{textDecoration:'none',color:'green'}} to={`/form/${el._id}`} >view</Link>
            <Link style={{textDecoration:'none',color:'blue'}}>Edit</Link>
            <Link style={{textDecoration:'none',color:'red'}}>Delete</Link>
            </div>
          </div>)
        })}
        </div>
    </div>
    </div>
  )
}

export default Home

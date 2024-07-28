import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom";
import { useDispatch} from 'react-redux'
import Home from "./components/Home";
import CreateForm from "./components/createForm";
import Form from "./components/Form";
import './App.css'
import axios from './config/axios'
import { startGetAllForms } from "./actions/forms-actions";

function App() {
  const [forms,setForms] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    (async() => {
      try {
        dispatch(startGetAllForms())
        // const res = await axios.get('/form/list')
      } catch (e) {
        console.log('err',e.message)
      }
    })()
  },[])

  return (
    <>
      <div>
       
        {/* <h2>Forms</h2> */}
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/create" element={<CreateForm />}/>
          <Route path='/form/:id' element={<Form/>} />
        </Routes>
      </div>
    </>
  )
}

export default App

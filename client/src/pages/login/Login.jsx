import React, {useState} from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import "./Login.scss"
import newRequests from "../../utils/newRequests"

function Login() {
 const [username, setUsername] = useState("")
 const [password, setPassword] = useState("")
 const [error, setError] = useState("")

 const navigator = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequests.post("/auth/login", {
        username,
        password,
      })
      localStorage.setItem("currentUser", JSON.stringify(res.data))
      navigator("/")
    }catch(err) {
      setError(err.response.data)
      console.log(err)
    }
  }

  return (
    <div className="login">
      <form action="" onSubmit={handleSubmit}>
         <h1>Sign In</h1>
         <label htmlFor="">Username</label>
         <input type="text" name="username" placeholder="" onChange={e => setUsername(e.target.value)} />

          <label htmlFor="">Password</label>
          <input type="password" name="password" placeholder=""  onChange={e => setPassword(e.target.value)}/>

          <button type="submit" >Login</button>
          {error && error}
      </form>
    </div>
  )
}

export default Login
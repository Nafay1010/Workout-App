import {useState} from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, loading , error} = useLogin()


    const handleSubmit = async (e)=>{
        e.preventDefault()

        await login(email, password)
        // console.log(email, password);
    }
    return ( 
        <form className='login' onSubmit={handleSubmit}>
            <h3>Log In</h3>

            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <div className='btn'>
            <button disabled={loading}>Login</button>
            </div>
            {error && <div className='error'>{error}</div>} 
        </form>
     );
}
 
export default Login;
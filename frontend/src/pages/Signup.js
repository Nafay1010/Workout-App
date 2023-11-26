import {useState} from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, loading , error} = useSignup()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        // console.log(email, password);
        await signup(email, password)
    }
    return ( 
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <div className='btn'>
            <button disabled={loading}>Signup</button>
            </div>
            {error && <div className='error'>{error}</div>}
        </form>
     );
}
 
export default Signup;
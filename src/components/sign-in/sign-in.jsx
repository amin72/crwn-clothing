import { useState } from "react"
import CustomButton from "../custom-button/custom-button"
import FormInput from '../form-input/form-input'
import { auth, signInWithGoogle } from "../../firebase/utils"

import './sign-in.scss'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await auth.signInWithEmailAndPassword(email, password)
            setEmail('')
            setPassword('')
        } catch(error) {
            console.error(error)
        }
        
        setEmail('')
        setPassword('')
    }

    const handleChange = e => {
        const { value, name } = e.target
        
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    }
    return (
        <div className="sign-in">
            <h2>I already have  an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <div>
                    <FormInput
                        name='email'
                        value={email}
                        label="Email"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <FormInput
                        name='password'
                        value={password}
                        type="password"
                        label="Password"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="buttons">
                    <CustomButton type="submit">SIGN IN</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>SIGN IN WITH GOOGLE</CustomButton>
                </div>
            </form>
        </div>
    )
}

export default SignIn
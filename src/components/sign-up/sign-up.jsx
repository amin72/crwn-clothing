import FormInput from '../form-input/form-input'
import CustomButton from '../custom-button/custom-button'
import { auth, createUserProfileDocument } from '../../firebase/utils'

import './sign-up.scss'
import { useState } from 'react'

const SignUp = () => {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert("Password don't match")
            return
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            await createUserProfileDocument(user, { displayName })

            // reset state values
            setDisplayName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <div className='sign-up'>
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>

            <form className='sign-up-form' onSubmit={handleSubmit}>
                {/* displayName field */}
                <FormInput
                    type="text"
                    name="displayName"
                    label="Display Name"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    required />
                
                {/* email field */}
                <FormInput
                    type="email"
                    name="email"
                    label="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required />
                
                {/* passowrd field */}
                <FormInput
                    type="password"
                    name="password"
                    label="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required />
                
                {/* confirmPassowrd field */}
                <FormInput
                    type="password"
                    name="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required />
                
                <CustomButton type="submit">SIGN UP</CustomButton>
            </form>
        </div>
    )
}

export default SignUp
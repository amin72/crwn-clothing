import './custom-button.scss'

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
    <button
        className={`${isGoogleSignIn ? 'google-sign-in' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
        {children}
    </button>
)

export default CustomButton
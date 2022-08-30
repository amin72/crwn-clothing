import './App.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/homepage/homepage'
import ShopPage from './pages/shop/shop'
import Header from './components/header/header'
import SingInSingUpPage from './pages/singin-signup/signin-signup'
import { auth, createUserProfileDocument } from './firebase/utils'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/actions'

const App = ({ setCurrentUser, currentUser }) => {
    useEffect(() => {
        const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    })
                })
            } else {
                setCurrentUser(null)
            }
        })

        return () => {
            unsubscribeFromAuth()
        }
    }, [])

    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/shop' element={<ShopPage />} />
                <Route
                    path='/signin'
                    element={
                        currentUser ?
                        <Navigate to="/" replace />
                        : <SingInSingUpPage />
                    }
                />
            </Routes>
        </div>
    )
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

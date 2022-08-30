import './App.scss'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage/homepage'
import ShopPage from './pages/shop/shop'
import Header from './components/header/header'
import SingInSingUpPage from './pages/singin-signup/signin-signup'
import { auth, createUserProfileDocument } from './firebase/utils'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/actions'

const App = ({ setCurrentUser }) => {
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
                <Route path='/signin' element={<SingInSingUpPage />} />
            </Routes>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App)

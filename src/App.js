import './App.scss'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage/homepage'
import ShopPage from './pages/shop/shop'
import Header from './components/header/header'
import SingInSingUpPage from './pages/singin-signup/signin-signup'
import { auth, createUserProfileDocument } from './firebase/utils'
import { useEffect, useState } from 'react'

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);

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

    console.log(currentUser)

    return (
        <div>
            <Header currentUser={currentUser} />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/shop' element={<ShopPage />} />
                <Route path='/signin' element={<SingInSingUpPage />} />
            </Routes>
        </div>
    )
}

export default App

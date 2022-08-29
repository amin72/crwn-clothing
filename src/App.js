import './App.scss'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage/homepage'
import ShopPage from './pages/shop/shop'
import Header from './components/header/header'
import SingInSingUpPage from './pages/singin-signup/signin-signup'
import { auth } from './firebase/utils'
import { useEffect, useState } from 'react'

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            console.log(user)
        })

        return () => {
            unsubscribeFromAuth()
        }
    }, [])

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

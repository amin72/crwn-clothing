import './App.scss'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage/homepage'
import ShopPage from './pages/shop/shop'
import Header from './components/header/header'

const App = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/shop' element={<ShopPage />} />
            </Routes>
        </div>
    )
}

export default App

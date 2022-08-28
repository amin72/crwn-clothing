import './App.css'
import HomePage from './pages/homepage/homepage'
import { Routes, Route } from 'react-router-dom'

const HatsPage = () => (
  <div>
    <h1>Hats</h1>
  </div>
)

const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/shop/hats' element={<HatsPage />} />
            </Routes>
        </div>
    )
}

export default App

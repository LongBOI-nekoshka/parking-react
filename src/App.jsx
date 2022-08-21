import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Park from './components/Park';
import History from './components/History';
import {
  RecoilRoot,
} from 'recoil';
function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/park' element={<Park/>}/>
            <Route path='/history' element={<History/>}/>
          </Routes>
        </BrowserRouter>

      </RecoilRoot>
    </div>
  )
}

export default App

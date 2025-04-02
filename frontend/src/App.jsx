import React from 'react'
import Start from './pages/Start'
import Home from './pages/Home'
import UserLogin from './pages/userlogin'
import CaptainSignUp from './pages/captainSingup'
import UserSingUp from './pages/usersingup'
import CaptainLogin from './pages/captainLogin'
import UserLogout from './pages/UserLogout'
import { Route, Routes } from 'react-router-dom'
import UserProtectiveWarapper from './pages/UserProtectiveWarapper'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
// import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
// import CaptainHome from './pages/CaptainHome'
const App = () => {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/captain-Singup" element={<CaptainSignUp />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/singup" element={<UserSingUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/home" element={<UserProtectiveWarapper><Home /></UserProtectiveWarapper>} />
        <Route path="/user/logout" element={<UserProtectiveWarapper><UserLogout/></UserProtectiveWarapper>} />
        <Route path="/captain/home" element={<CaptainProtectWrapper><CaptainHome /></CaptainProtectWrapper>} />
        <Route path="/captain/logout" element={<CaptainProtectWrapper><CaptainHome/></CaptainProtectWrapper>} />
      </Routes>
    </div>
  )
}

export default App

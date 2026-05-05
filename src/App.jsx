import { useState } from 'react'
import './App.css'
import Registration from './Component/Registration/Registration'
import './Component/Registration/Registration.css'
import Login from './Component/Login/Login'
import { Route, Routes } from 'react-router-dom'
import Panel from './Component/Panel/Panel'
import './Component/Panel/Panel.css'




import Groups from './Component/Groups/Groups'
import Tasks from './Component/Tasks/Tasks'
import TaskPop from './Component/TaskPop/TaskPop'
import UserComp from './Component/UserComp/UserComp'
import LeaderBoard from './Component/LeaderBoard/LeaderBoard'

function App() {

  const [userInfo, setUserInfo] = useState([])
  const [userObj, setUserObj] = useState(null)

  return (
    <Routes>

      <Route 
        path='/' 
        element={
          <Login 
            userInfo={userInfo} 
            setUserInfo={setUserInfo} 
            userObj={userObj} 
            setUserObj={setUserObj} 
          />
        } 
      />

      <Route 
        path='/register' 
        element={
          <Registration 
            userInfo={userInfo} 
            setUserInfo={setUserInfo}
          />
        } 
      />

      <Route 
        path='/panel' 
        element={
          <Panel 
            userInfo={userInfo} 
            setUserInfo={setUserInfo} 
            userObj={userObj} 
            setUserObj={setUserObj}
          />
        }
      >
       
        <Route index element={<h2>Dashboard</h2>} />

        <Route path='groups' element={<Groups />} />
        <Route path='tasks' element={<Tasks />} />
        <Route path='users' element={<UserComp />} />
        <Route path='leaderboard' element={<LeaderBoard/>} />
        <Route path='TaskPop' element={<TaskPop />} />

      </Route>

    </Routes>
  )
}

export default App
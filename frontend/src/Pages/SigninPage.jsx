import React,{useState} from 'react'
import SignIn from '../components/SignIn'
import SignUp from '../components/Signup'
import Togel from '../components/Togel'

function SigninPage() {
    const [isLog, setLog] = useState(false)
  return (
    <div className='flex col justify-center items-center h-screen max-h-full bg-gradient-to-r from-black to-cyan-700 opacity-90 '>
      <div className="bg-white border rounded-3xl shadow-text-white shadow-md relative w-[768px] max-w-full min-h-[540px] overflow-hidden">
      
        {isLog ?  <SignUp setIsLog={setLog} isLog={isLog}/>:<SignIn setLog={setLog}/>}
        <Togel isLog={isLog} setIsLog={setLog}/>
       
      </div>
    </div>
  )
}

export default SigninPage
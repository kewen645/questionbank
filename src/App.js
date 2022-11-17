import { Outlet } from 'react-router-dom'
import Tabbar from '@/components/Tabbar'
import './App.less'

export default function App() {
  return (
    <div className='app'>
      <Outlet />
      <Tabbar />
    </div>
  )
}




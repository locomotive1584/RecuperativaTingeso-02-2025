import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { DefaultPage } from './components/DefaultPage'
import TopBar from './components/TopBar'
import { AddEgress } from './components/AddEgress'
import { EgressList } from './components/EgressList'
import { AddIngress } from './components/AddIngress'
import { IngressList } from './components/IngressList'
import { ReportList } from './components/ReportList'

function App() {
  return (
    <Router>
      <div className='container' style={{ paddingTop: '80px' }}>
        <TopBar />
        <Routes>
          <Route path="*" element={<ReportList />} />

          <Route path="/egress/add" element={<AddEgress />} />
          <Route path="/egress/list" element={<EgressList />} />
          
          <Route path="/ingress/add" element={<AddIngress />} />
          <Route path="/ingress/list" element={<IngressList />} />
          
          <Route path="/reports/movements" element={<ReportList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { DefaultPage } from './components/DefaultPage'
import TopBar from './components/TopBar'
import { AddEditClient } from './components/AddEditClient'
import { ClientList } from './components/ClientList'
import { ToolList } from './components/ToolList';
import { AddEditTool } from './components/AddEditTool';
import { LoanList } from './components/LoanList';
import { AddEditLoan } from './components/AddEditLoan';
import { DevolutionList } from './components/DevolutionList';
import { AddDevolution } from './components/AddDevolution';
import { BillManagement } from './components/BillManagement';
import { KardexList } from './components/KardexList';
import { AddEditKardex } from './components/AddEditKardex';
import { MovementList } from './components/MovementList';
import { AddMovement } from './components/AddMovement';
import { ActiveLoansReport } from './components/ActiveLoansReport';
import { DelayedClientsReport } from './components/DelayedClientsReport';
import { TopToolsReport } from './components/TopToolsReport';
import { UnitList } from './components/UnitList';
import { AddEditUnit } from './components/AddEditUnit';
import { CreateMultipleUnits } from './components/CreateMultipleUnits';


function App() {

  return (
    <Router>
      <div className='container'>
        <TopBar/>
        <Routes>
          <Route path="*" element={<DefaultPage/>}/>
          <Route path="/client/edit/:id" element={<AddEditClient/>}/>
          <Route path="/client/add" element={<AddEditClient/>}/>
          <Route path="client/list" element={<ClientList/>}/>
          <Route path="/tool/list" element={<ToolList />} />
          <Route path="/tool/add" element={<AddEditTool />} />
          <Route path="/tool/edit/:id" element={<AddEditTool />} />
          <Route path="/loan/list" element={<LoanList />} />
          <Route path="/loan/add" element={<AddEditLoan />} />
          <Route path="/loan/edit/:id" element={<AddEditLoan />} />
          <Route path="/devolution/list" element={<DevolutionList />} />
          <Route path="/devolution/add" element={<AddDevolution />} />
          <Route path="/loan/list" element={<LoanList />} />
          <Route path="/loan/add" element={<AddEditLoan />} />
          <Route path="/loan/edit/:id" element={<AddEditLoan />} />
          <Route path="/devolution/list" element={<DevolutionList />} />
          <Route path="/devolution/add" element={<AddDevolution />} />
          <Route path="/bills/manage" element={<BillManagement />} />
          <Route path="/kardex/list" element={<KardexList />} />
          <Route path="/kardex/add" element={<AddEditKardex />} />
          <Route path="/kardex/edit/:id" element={<AddEditKardex />} />
          <Route path="/movements/list" element={<MovementList />} />
          <Route path="/movements/add" element={<AddMovement />} />
          <Route path="/reports/active-loans" element={<ActiveLoansReport />} />
          <Route path="/reports/delayed-clients" element={<DelayedClientsReport />} />
          <Route path="/reports/top-tools" element={<TopToolsReport />} />
          <Route path="/unit/list" element={<UnitList />} />
          <Route path="/unit/add" element={<AddEditUnit />} />
          <Route path="/unit/edit/:id" element={<AddEditUnit />} />
          <Route path="/unit/create-multiple" element={<CreateMultipleUnits />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
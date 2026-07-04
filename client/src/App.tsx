
import Layout from './components/layout/Layout.tsx'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard.tsx'
import Tasks from './pages/Tasks.tsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/tools' element={<div>SEOTools в Работе</div>} />
        <Route path='*' element={<div>404 — страница не найдена</div>} />
        <Route path='/tasks' element={<Tasks />} />
      </Routes>
    </ Layout >
  )
}
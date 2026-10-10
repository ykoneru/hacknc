import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { Home } from './pages/Home'
import { Placeholder } from './pages/Placeholder'

export function App() { return <BrowserRouter><Routes><Route element={<AppShell />}><Route path="/" element={<Home />} /><Route path="/community" element={<Placeholder kind="community" />} /><Route path="/compete" element={<Placeholder kind="compete" />} /><Route path="/rewards" element={<Placeholder kind="rewards" />} /><Route path="/profile" element={<Placeholder kind="profile" />} /></Route></Routes></BrowserRouter> }

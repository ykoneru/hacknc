import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { Home } from './pages/Home'
import { Placeholder } from './pages/Placeholder'
import { Community } from './pages/Community'
import { Compete } from './pages/Compete'
import { SubmitQuest } from './pages/SubmitQuest'

// One route per line so parallel edits don't collide.
export function App() {
  return <BrowserRouter>
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/compete" element={<Compete />} />
        <Route path="/submit/:questId" element={<SubmitQuest />} />
        <Route path="/rewards" element={<Placeholder kind="rewards" />} />
        <Route path="/profile" element={<Placeholder kind="profile" />} />
      </Route>
    </Routes>
  </BrowserRouter>
}

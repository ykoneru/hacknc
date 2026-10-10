import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { Home } from './pages/Home'
import { Placeholder } from './pages/Placeholder'
import { CompletionPreview } from './pages/CompletionPreview'
import { Rewards } from './pages/Rewards'
import { Profile } from './pages/Profile'
import { Onboarding } from './pages/Onboarding'
import { Passport } from './pages/Passport'
import { Collections } from './pages/Collections'
import { NotFound } from './pages/NotFound'

export function App() { return <BrowserRouter><Routes><Route path="/onboarding" element={<Onboarding />} /><Route element={<AppShell />}><Route path="/" element={<Home />} /><Route path="/community" element={<Placeholder kind="community" />} /><Route path="/compete" element={<Placeholder kind="compete" />} /><Route path="/rewards" element={<Rewards />} /><Route path="/profile" element={<Profile />} /><Route path="/passport" element={<Passport />} /><Route path="/collections" element={<Collections />} />{import.meta.env.DEV && <Route path="/dev/completion-preview" element={<CompletionPreview />} />}<Route path="*" element={<NotFound />} /></Route><Route path="*" element={<NotFound />} /></Routes></BrowserRouter> }

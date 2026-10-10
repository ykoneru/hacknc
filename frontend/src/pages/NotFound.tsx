import { ArrowLeft, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFound() { return <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center"><div className="mb-6 grid h-20 w-20 place-items-center rounded-[2rem] bg-[#ffdb65]"><Compass size={35} /></div><p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-[#8d9187]">A wrong turn</p><h1 className="display text-6xl">Page not found</h1><p className="mt-4 max-w-sm text-[#777b72]">That adventure path does not exist yet. Let’s get you back to the Quest Board.</p><Link to="/" className="mt-8 flex items-center gap-2 rounded-2xl bg-[#20231f] px-6 py-4 font-bold text-white"><ArrowLeft size={17} />Back to Home</Link></div> }

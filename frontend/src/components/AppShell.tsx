import { Home, Users, Trophy, Gift, UserRound, Compass } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', icon: Home }, { to: '/community', label: 'Community', icon: Users },
  { to: '/compete', label: 'Compete', icon: Trophy }, { to: '/rewards', label: 'Rewards', icon: Gift }, { to: '/profile', label: 'Profile', icon: UserRound },
]

export function AppShell() {
  return <div className="app-shell"><div className="mx-auto flex min-h-screen max-w-7xl">
    <aside className="hidden w-64 flex-col border-r border-black/5 bg-white/45 p-6 md:flex">
      <div className="mb-12 flex items-center gap-2 text-xl font-black tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#20231f] text-[#ffdb65]"><Compass size={19} /></span>FlarUp</div>
      <nav className="flex flex-col gap-2">{links.map(({ to, label, icon: Icon }) => <NavItem key={to} to={to} label={label} Icon={Icon} />)}</nav>
      <div className="mt-auto rounded-3xl bg-[#20231f] p-5 text-white"><p className="mb-2 text-xs uppercase tracking-[.18em] text-[#ffdb65]">Your next move</p><p className="display text-2xl">Less scrolling.<br />More living.</p></div>
    </aside>
    <main className="min-w-0 flex-1 pb-24 md:pb-8"><Outlet /></main>
    <nav className="bottom-nav fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-xl justify-around border-t border-black/5 bg-[#fffdf8]/95 px-2 py-3 backdrop-blur-md md:hidden">{links.map(({ to, label, icon: Icon }) => <NavItem key={to} to={to} label={label} Icon={Icon} mobile />)}</nav>
  </div></div>
}

function NavItem({ to, label, Icon, mobile = false }: { to: string; label: string; Icon: typeof Home; mobile?: boolean }) {
  return <NavLink to={to} className={({ isActive }) => `flex ${mobile ? 'w-16 flex-col items-center gap-1 text-[10px]' : 'items-center gap-3 rounded-2xl px-4 py-3 text-sm'} font-semibold transition ${isActive ? 'bg-[#20231f] text-white' : 'text-[#777b72] hover:bg-black/5 hover:text-[#20231f]'}`}><Icon size={mobile ? 19 : 18} /><span>{label}</span></NavLink>
}

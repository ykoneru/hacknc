const palette = ['bg-[#ffdb65]', 'bg-[#bfe7c8]', 'bg-[#d8ccff]', 'bg-[#ffc8a3]', 'bg-[#bcdaf4]', 'bg-[#dce88f]']

export function Avatar({ id, letter, size = 'md' }: { id: string; letter: string; size?: 'sm' | 'md' | 'lg' }) {
  const color = palette[[...id].reduce((sum, c) => sum + c.charCodeAt(0), 0) % palette.length]
  const dims = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-14 w-14 text-lg' }[size]
  return <div className={`grid shrink-0 place-items-center rounded-full font-black text-[#20231f] ${color} ${dims}`}>{letter}</div>
}

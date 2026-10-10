import { useEffect, useState } from 'react'
import { Bookmark, BookmarkCheck, MapPin, PartyPopper } from 'lucide-react'
import type { FeedPost as FeedPostData } from '../../socialTypes'
import { feedService } from '../../services/feedService'
import { Avatar } from './Avatar'
import { RarityPill } from './RarityPill'
import { timeAgo } from './format'

const periodLabel = { daily: 'Daily quest', weekly: 'Weekly quest', monthly: 'Monthly quest', race: 'Weekly race' }

export function FeedPost({ post, isMine }: { post: FeedPostData; isMine: boolean }) {
  const [cheer, setCheer] = useState({ count: post.cheerCount, mine: post.cheeredByMe })
  const [pending, setPending] = useState(false)
  // TODO: persist through Developer 3/4's saved-quest endpoint once defined.
  const [saved, setSaved] = useState(false)

  // Pick up counts from background refreshes unless a cheer request is in flight.
  useEffect(() => {
    if (!pending) setCheer({ count: post.cheerCount, mine: post.cheeredByMe })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.cheerCount, post.cheeredByMe])

  async function toggleCheer() {
    if (pending) return
    const next = !cheer.mine
    const previous = cheer
    setCheer({ count: cheer.count + (next ? 1 : -1), mine: next })
    setPending(true)
    try {
      const result = await feedService.setCheer(post.id, next)
      setCheer({ count: result.cheerCount, mine: result.cheeredByMe })
    } catch {
      setCheer(previous)
    } finally {
      setPending(false)
    }
  }

  return <article className="overflow-hidden rounded-[2rem] bg-white shadow-[0_5px_15px_rgba(42,47,39,.06)]">
    <header className="flex items-center gap-3 p-4">
      <Avatar id={post.author.id} letter={post.author.avatar} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-extrabold">{isMine ? 'You' : post.author.name} <span className="font-semibold text-[#8d9187]">completed</span></p>
        <p className="flex items-center gap-1 text-xs text-[#8d9187]"><MapPin size={11} />{post.author.city} · {timeAgo(post.completedAt)}</p>
      </div>
      <RarityPill rarity={post.rarity} />
    </header>
    <div className="px-4 pb-3">
      <p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#8d9187]">{periodLabel[post.period]}</p>
      <h3 className="display text-2xl leading-tight">{post.questTitle}</h3>
    </div>
    <img src={post.imageUrl} alt={`${post.author.name}'s photo for ${post.questTitle}`} loading="lazy" className="aspect-square w-full bg-[#ecebe4] object-cover" />
    <div className="p-4">
      {post.caption && <p className="mb-4 text-sm leading-5 text-black/75">{post.caption}</p>}
      <div className="flex items-center gap-2">
        <button onClick={toggleCheer} aria-pressed={cheer.mine} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${cheer.mine ? 'bg-[#ffdb65] text-[#20231f]' : 'bg-[#f3f2ec] text-[#5d6158] hover:bg-[#ebe9e0]'}`}>
          <PartyPopper size={16} />{cheer.mine ? 'Cheered' : 'Cheer'}<span className="tabular-nums">{cheer.count}</span>
        </button>
        {!isMine && <button onClick={() => setSaved(s => !s)} aria-pressed={saved} className={`ml-auto flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${saved ? 'bg-[#20231f] text-white' : 'border border-black/10 text-[#20231f] hover:bg-black/5'}`}>
          {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}{saved ? 'Saved' : 'Try this quest'}
        </button>}
      </div>
    </div>
  </article>
}

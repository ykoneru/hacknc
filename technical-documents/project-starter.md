# FlarUp — Unified Product & HackNC Build Plan

**Updated:** October 10, 2026  
**Working tagline:** *Less scrolling. More living.*  
**Alternative pitch line:** *Every social app asks you to watch. FlarUp asks you to show up.*

> **Document status:** Combines the team's original FlarUp proposal with the new quest, streak, reward, and competition ideas. **The personalized quest model supersedes the original universal daily challenge and randomized two-hour deadline.** The universal challenge concept is retained as a separate weekly race. The team should approve the open decisions below before implementation.

## 1. Executive overview

**FlarUp** is a mobile-first social adventure app that motivates people to do fun, unusual, creative, and meaningful activities in real life. Each person receives quests from a large, varied bank across **daily, weekly, and monthly** time horizons. Completing a quest with a photo (and optional voice note) grows the corresponding streak, earns XP, adds a collectible memory to an **Adventure Passport**, and can appear in a friends/community feed and an opt-in, privacy-preserving live map.

Quests become **more novel, imaginative, and exciting** as players level up—not automatically longer, more expensive, physically harder, or more socially intimidating. Completing quests also earns **mystery chests** containing cosmetics, rerolls, and optional special quests.

Once per week, everyone in a given competition cohort gets the **same Weekly Community Race quest**. Participants compete on completion order, earn speed-based race points, and appear on **city, state, country, and global leaderboards**. Personal quest streaks remain independent from this race.

**Core promise:** Stop passively watching other people's lives; create experiences of your own and discover what your community is doing.

**Primary track:** Community. Potential sponsor tracks remain subject to the official event rules and working integrations; do not add services just to list more tracks.

## 2. Problem and audience

Traditional social feeds reward posting, attention, and passive consumption. Many people want to try new experiences or build community but lack ideas, motivation, and a social reason to begin. FlarUp supplies a concrete next action, a playful reward, and an audience of friends or opted-in community members.

**Initial audience:** College students and friend groups. The design can expand to local communities and other age groups later.

**Avoid unproven claims:** We can demonstrate engagement and working shared interactions; we cannot prove that FlarUp reduces loneliness or improves mental health during a 24-hour hackathon.

## 3. Core user loop

1. **Open the Quest Board** and see assigned or offered daily, weekly, and monthly quests, each with its own deadline.
2. **Choose a feasible quest** from a small personalized selection (recommended: 3 choices per period, plus a limited reroll). A larger curated bank ensures different users get different activities.
3. **Complete it in real life** and submit a photo of the experience or result; optionally attach a short voice note and caption.
4. **Earn progress:** corresponding streak +1 for the period (at most once per period), XP, a Passport entry, and an eligible mystery chest.
5. **Share or keep private:** opt-in post to friends/community feed and optional approximate-area map display.
6. **Discover:** react, listen to friends' voice notes, and save a quest from another person's post using **Try This Quest**.
7. **Compete:** separately participate in the shared Weekly Community Race and climb regional leaderboards.

## 4. Three independent personalized quest tracks

| Track | Deadline | Intended feeling | Illustrative quests | Streak rule |
|---|---|---|---|---|
| **Daily: Little Adventures** | End of user's local calendar day | Spontaneous, playful, accessible | Photograph a hidden detail; recreate an old photo; create a tiny piece of art; discover a new place nearby | Complete ≥1 eligible daily quest that day |
| **Weekly: Break the Routine** | Sunday 11:59 p.m. in user's chosen timezone | Unexpected, social, creative | Try an unfamiliar hobby; create a themed photoshoot; learn something from a friend; visit a new local spot | Complete ≥1 eligible weekly quest that week |
| **Monthly: Bucket-List Moments** | Last calendar day at 11:59 p.m. | Memorable, surprising, story-worthy | Recreate a movie scene; perform at an open mic; plan a themed outing; explore an unfamiliar town | Complete ≥1 eligible monthly quest that month |

**Crucial design principle:** These are *deadline and novelty tiers*, not time requirements. A monthly quest may take 20 minutes; a weekly quest might take several hours. Travel can take longer but should never be mandatory for everyone.

**Streak behavior:** Daily, weekly, and monthly streaks are independent. Missing one does not affect the others. All earned XP, photos, cosmetics, and Passport entries remain even if a streak resets. Count at most one increment per period; optional extra quests may award capped XP but not additional streak increments.

**Timezone and edge cases:** Store a user's selected timezone and period keys on the server. Define weeks as Monday–Sunday. Monthly quests expire at the end of the local calendar month. Prevent double completion by unique constraints and server-side timestamps. For demo purposes, use a separate **demo clock/seed mode** rather than waiting for real dates.

### Quest selection and large bank

- Maintain a curated library with tags: `period`, `category`, `rarity`, `novelty_level`, `estimated_cost`, `mobility_requirement`, `social_requirement`, `indoor_outdoor`, `photo_prompt`, `safety_notes`.
- Offer a few suitable quests per period; use interests and constraints to filter, then randomize among eligible options.
- Users can reroll impractical options. Avoid repeating recently completed quests.
- Categories: **Social**, **Adventure/Exploration**, **Creative**, **Community**, and optionally **Learning/Well-being**.
- A user can tap **Try This Quest** on someone else's public post to save an optional challenge; it does not retroactively replace a required quest.
- Start with **30–60 thoughtfully written quests**, not hundreds of generic AI-generated ones.

### Sample quest titles

**Daily:** Hidden Beauty; Photo Time Machine; Three-Color Hunt; Tiny Creation; Soundtrack of Today.  
**Weekly:** The Movie Poster Challenge; Skill Swap; Mystery Route (user chooses a safe route); One-Hour Artist; Friend-Designed Adventure.  
**Monthly:** The Unknown Destination; Open-Mic Moment; Build a Mini Tradition; Real-Life Movie Scene; Host a Theme Night.

All quests need a feasible low-cost alternative; no unsafe trespassing, dangerous stunts, pressured contact with strangers, or mandatory photographing of bystanders.

## 5. Progression: XP, adventure levels, and rarity

**Two distinct systems:**

- **Streaks** reward consistency within each period.
- **XP / Adventure Level** reflects cumulative participation and unlocks increasingly creative, unusual quest options; it does not reset with a missed streak.

**Rarity:** Common, Rare, Epic, Legendary. Rarity is a separate property from period. Typical assignments can favor Common for daily, Rare for weekly, and Epic for monthly, while leaving room for exceptions and special events.

**Better progression:** Higher levels unlock imaginative mechanics—collaborative storytelling, scavenger hunts, themed adventures, user-designed challenges—not simply more time, money, travel, or physical exertion.

**Illustrative rewards:** Daily +25 XP, weekly +100 XP, monthly +300 XP. Balance after testing; these are provisional, not fixed requirements.

## 6. Mystery chests and inventory

Completing an eligible quest grants a chest associated with its rarity, with **one chest claim per streak period** to avoid farming. Additional special achievement chests can be awarded for completing quest collections.

| Chest | Typical source | Potential contents |
|---|---|---|
| **Common** | Common/daily completion | Small cosmetic, XP bonus, reroll token |
| **Rare** | Rare/weekly completion | Profile frame, map-pin skin, themed quest card |
| **Epic** | Epic/monthly completion | Animated badge, co-op quest, special challenge pack |
| **Legendary** | Collection milestone or exceptional achievement | Unique title, custom quest invitation, special cosmetic set |

**Reward classes:** (1) cosmetics such as badges, avatar frames, map-pin styles, and narrator voice choices; (2) utility such as limited quest rerolls; (3) experiences such as a surprise cooperative mission or **Golden Ticket** to create a custom quest for friends.

**Fairness:** No paid randomized boxes. Show possible rewards and probabilities if randomized. Guarantee a useful reward or offer deterministic milestones. Don't put essential accessibility features or core streak survival behind luck. Persist all claimed rewards in inventory.

### Quest Collections

A **collection** rewards breadth rather than grinding: e.g., complete one Social, one Adventure, one Creative, and one Community quest to unlock the Explorer Chest. The collection UI displays earned stamps and missing categories.

## 7. Adventure Passport

A permanent, collectible gallery of completed quests: photo, quest title, date, period, rarity, XP, optional caption/voice note, and any earned badge. Users can view memories even after losing a streak. Allow private entries and deletion. This is a **real-life experience scrapbook**, not merely a score history.

## 8. Social layer: community feed, friends, and live map

### Community feed

- Every shared completion becomes a mission-first post: **who completed which quest**, photo, optional caption/voice, and earned achievement.
- Filter **Friends**, **Community**, and optionally **Following**; display varied personalized quests rather than one universal daily post.
- React with a cheer and/or short voice reaction; let viewers **Try This Quest** or invite a friend to a co-op challenge.
- Prioritize completed experiences over public follower/like counts.

### Friends and discovery

- Add friends via username or QR code; invite to co-op or optional challenges.
- Support existing friends and new connections through shared community spaces, but **no anonymous random matching is needed for the hackathon**.

### Live map (retain from teammate's original plan)

- Map displays **opt-in public quest completions** as approximate regional pins or clustered markers. Tapping shows the quest and submission.
- A map can visualize variety across locations; it is no longer restricted to the same simultaneous two-hour challenge.
- Filters: recent submissions, quest category, and region. Avoid exposing home, workplace, or exact current GPS coordinates.
- **Default map visibility off**, even for a public profile; user chooses sharing audience separately for feed and map. Prefer city-level location selection or coarse coordinates. Never infer someone's live location from their photo.
- Private users can participate fully without appearing on the public map.

**Privacy/security:** Respect photo consent, allow report/delete/block, don't require faces or exact location, and do not automatically post a photo without preview and confirmation. Some challenges should allow a result photo or short reflection instead of a selfie.

## 9. Weekly Community Race — one shared quest

Every Monday, the app releases **one shared quest** to all eligible participants in a competition cohort. It remains open until Sunday 11:59 p.m. local competition time. This is **separate** from each user's personalized weekly quest and streak.

**Example:** The Movie Poster Challenge — recreate a recognizable poster using available props and locations. Submit your creation; earlier valid completions rank higher.

### Ranking and scoring

- The server records the **first valid submission timestamp** per user for that week's race.
- The leaderboard updates live by submission order; ties are resolved by server timestamp and a stable ID.
- At race close, award **1 + number of registered participants whose valid completion occurred later**. Participants who never complete are **not counted as people you beat** under this literal completion-order formula; if the team wants nonfinishers counted, define that alternative explicitly.
- Also award a **fixed participation reward** so completing near the deadline still matters.
- Example: with 100 *finishers*, ranks 1–100 receive 100 down to 1 speed points. If only 40 finish, ranks 1–40 receive 40 down to 1.
- Use a single clearly announced release time for the cohort; for worldwide competition, use a shared UTC release/deadline or separate regional cohorts. **Do not rank users by an unfair mixture of local release times.**
- Weekly Race completion does **not** maintain or reset the personalized weekly streak unless the team deliberately decides to allow a quest to satisfy both (recommended default: separate).

**Fairness and safety:** Race challenges should be achievable indoors or nearby, with no travel/expense advantage. Speed should not incentivize dangerous behavior. Avoid tasks that require photographing nonconsenting people. The first valid completion matters, not who taps a button fastest.

### Race rewards

- Everyone who finishes: participation XP and a Community Chest.
- Top finishers: podium cosmetics and optional bonus chest.
- Four-week **seasons**: sum finalized race points; season reset keeps competition approachable for new users.
- Optional community milestone: when enough people finish, all participants unlock a collective cosmetic or chest.

## 10. Geographic and community leaderboards

**Filters:** City, State/Province, Country, Global; optional University/Campus and Friends.

**Views:**

1. **Weekly Race:** Completion order and finalized race points for the shared challenge. Clarify whether regional views use *global race points filtered by region* or *region-specific completion rank*; recommended: **global points with a region filter** for consistent scoring, plus visible local rank.
2. **Season Adventure XP:** Points earned through personalized quests during a four-week season.
3. **Streak Legends:** Active daily, weekly, or monthly streak lengths (separate tabs, never summed as if equivalent).

**City vs. City** is a stretch feature: compare average XP or completion rate per active participant, with a minimum active-user threshold, instead of raw totals that automatically favor larger cities.

**Geography privacy:** City/state/country can be user-selected and optionally verified later. Never show a user's precise location or home address. Geographic identity is approximate and self-reported in the hackathon version, so don't imply verified location accuracy.

**Critical scoring caveat:** A pure 'number of people beaten' formula scales with cohort size, so a national race naturally yields more points than a small city race. Keep a single shared scoring pool for seasonal comparison or normalize if running separate cohorts; don't mix incomparable point scales.

## 11. Audio and AI features from the original FlarUp proposal

### Optional voice notes and reactions (ElevenLabs)

- Attach an optional ≤30-second voice note to a quest completion.
- Friends can react with short voice clips. ElevenLabs voice effects are a **stretch** if the API, latency, and privacy handling work reliably; normal playback is sufficient for MVP.
- Don't force voice as the only response type: support quiet/textless reactions for accessibility and noisy environments.

### AI Quest Narrator / recap (Gemini + ElevenLabs)

- Gemini can propose challenges **within validated safe templates and user constraints**, not generate unrestricted dares.
- An optional personalized **audio highlight show** summarizes consented friends' shared submissions. Gemini drafts the script; ElevenLabs reads it.
- Never describe an AI summary as proof that a photo is authentic. Do not send private photos to external services without appropriate consent.
- For a 24-hour build, prioritize **one genuine end-to-end AI integration** over several unreliable integrations.

### Analytics and sponsor services

- **Snowflake:** Optional aggregated community stats (participation, categories, cities). Useful only if a real integration can be demonstrated.
- **Tiger Data:** Optional real-time submission/event queries if it genuinely powers the map; otherwise Supabase Realtime alone may be simpler.
- **Solana:** Original proposal's on-chain streak micro-tokens are **not recommended for MVP**. In-app XP and cosmetics deliver the reward loop with far less implementation and onboarding friction. Revisit on-chain rewards only if a sponsor prize justifies the complexity and the team can implement a real transaction safely.
- **.Tech domain:** Use `flarup.tech` only if registered/verified; do not claim availability without checking.

## 12. Feature priorities for a 4-person, 24-hour hackathon

### P0 — Build and demo these first

1. **Mobile-first responsive web app** (PWA optional) with clean onboarding and a Quest Board.
2. **Curated quest bank** (30–60 entries), daily/weekly/monthly options, rarity/category metadata.
3. **Three independent streak counters**, server-side deadlines, XP, and Adventure Level.
4. **Camera/photo upload** with preview and opt-in submission visibility; storage and database persistence.
5. **Community feed** that shows real quest completions.
6. **One shared Weekly Community Race**, live submission order, and a working leaderboard.
7. **Region filter** on the leaderboard (city/state/country/global) using demo users and real app data.
8. **One genuinely working mystery chest** and persisted reward inventory.

### P1 — Add if P0 is stable

- **Adventure Passport** gallery and Quest Collections.
- **Live map** with coarse, opt-in pins and realtime updates. This is visually important to the teammate's original concept; consider promoting it to P0 **instead of** another feature if the map is the team's main differentiator.
- **Try This Quest**, limited rerolls, friend invites/QR codes.
- **One real Gemini→ElevenLabs narration or recap path** (not three AI demos).

### P2 — Post-hackathon / only if unusually ahead

- Full voice-reaction filters, robust notifications and randomized alerts.
- Large-scale Snowflake analytics, Tiger Data pipeline, Solana wallet/minting.
- Sophisticated personalization, anonymous matching, automated photo verification, city-vs-city tournaments, advanced content moderation.
- Native iOS/Android apps, fully featured social graph, custom quest moderation.

**Reality check:** Even P0 is ambitious for four people in 24 hours. Prioritize a flawless **quest → photo → streak/XP → chest → live feed/leaderboard** flow. If behind schedule, drop map/AI/extra leaderboard types before sacrificing core reliability.

## 13. Suggested implementation architecture

**Frontend:** React + Vite or Next.js, responsive/mobile-first; camera via file input with `capture` where supported; browser file-picker fallback. PWA optional.

**Backend:** Supabase Auth + Postgres + Storage + Realtime for fastest setup, or the team's preferred Node/Express API if already underway. Avoid splitting the source of truth across several databases during MVP.

**Core tables (illustrative):**

- `users(id, display_name, timezone, city, state, country, interests, visibility_settings, xp, level)`
- `quests(id, title, description, period, category, rarity, novelty_level, constraints_json, active)`
- `quest_offers(id, user_id, quest_id, period_key, expires_at, selected_at)`
- `submissions(id, user_id, quest_id, period_key, image_url, voice_url, caption, visibility, submitted_at, status)`
- `streaks(user_id, period, current_count, longest_count, last_completed_period_key)`
- `inventory(id, user_id, reward_type, reward_id, earned_at, claimed_at)`
- `weekly_races(id, quest_id, cohort_id, starts_at, ends_at, status)`
- `race_entries(race_id, user_id, submission_id, completed_at, rank, finalized_points)`
- `reactions(id, submission_id, user_id, kind, audio_url, created_at)`

**Server rules:** Only authenticated users can submit; protect media with storage policies; count each user's streak once per period; ensure each race user has at most one qualifying entry; calculate leaderboard ranks server-side; award chest once per qualifying completion; use transaction-safe or idempotent completion processing.

**Real-time demo:** Two logged-in test accounts on phone/laptop. Submit on phone → feed and leaderboard update on laptop. Preload **clearly labeled demo/sample accounts** to make rankings meaningful; never imply seeded users are actual live participants.

## 14. Demo strategy: phone + laptop

**Use the phone as the hero device** for receiving and completing a quest; use the **laptop** for the feed, regional leaderboard, and (if implemented) live map. Mirror the phone screen to a larger display if practical. Use a stable hotspot or reliable Wi-Fi and have a recorded backup.

### Two-minute video script

| Time | Demonstration |
|---|---|
| 0:00–0:15 | Problem and one-line FlarUp pitch; show Quest Board |
| 0:15–0:35 | Phone: choose a personalized daily quest and submit photo |
| 0:35–0:55 | Daily streak increments, XP earned, chest opens and reward saves |
| 0:55–1:15 | Laptop: same photo appears in community feed; optionally map pin updates |
| 1:15–1:40 | Shared Weekly Community Race: second account completes; leaderboard changes; switch City → State → Country |
| 1:40–2:00 | Show weekly/monthly quests and Passport or audio recap; end on community impact |

**Judge takeaway:** A real-life action produces a social artifact and visible progress for both the individual and community, in real time.

## 15. Team split and build order

| Owner | Primary responsibility | First deliverable |
|---|---|---|
| **A — Frontend** | Quest Board, onboarding, responsive UI, streak and chest animations | Working quest selection UI |
| **B — Social** | Camera/upload, feed, Passport, optional map | Real photo submitted and visible |
| **C — Backend** | Auth, DB, streak rules, XP, rewards, storage policies | End-to-end submission endpoint |
| **D — Competition/integrations** | Weekly race, rankings, geographic filters; optional AI/audio | Live leaderboard from real entries |

**Suggested build order:** (1) schema + shared contracts, (2) quest → submit → persist, (3) streak/XP/reward, (4) live feed, (5) weekly race + region filter, (6) polished demo, (7) optional map/audio. Reserve several hours for integration, deployment, bug fixing, and video capture.

## 16. Open product decisions to settle before coding

1. **Quest choice:** One forced assignment or three eligible choices per period? **Recommendation: three choices plus limited rerolls.**
2. **Weekly race cohort:** One global race with a common UTC start/end, or regional races with local times? **Recommendation for MVP: one cohort and one shared clock; region is only a leaderboard filter.**
3. **Speed points:** Beat only later finishers (literal idea) or also nonfinishers? **Recommendation: only later finishers, plus fixed completion XP.**
4. **Live map prominence:** Homepage centerpiece from original doc or secondary Explore tab? **Recommendation: Quest Board home; Map as Explore tab.**
5. **Chest frequency:** One per qualifying streak period, or one per every optional quest? **Recommendation: one per period, with special milestone chests.**
6. **Location:** User-selected city/state/country and coarse opt-in map location. **Recommendation: no precise GPS requirement.**
7. **AI/sponsor prize strategy:** Select at most one optional integration after the core loop is stable.

## 17. What makes FlarUp compelling—and what to watch

**Strengths:** Clear problem and hook; genuinely mobile-native capture experience; visually demonstrable realtime interaction; personalized quest variety; three independent streaks; satisfying progression/rewards; shared weekly race; meaningful local-to-global discovery.

**Risks:** Feature overload; social/photo privacy; impossible-to-verify challenge claims; unsafe or exclusionary quests; leaderboards skewed by cohort size/timezone; mystery rewards eclipsing real-world activity; a global map with only a handful of real users looking empty.

**Positioning:** FlarUp is **not** just Snapchat streaks, a BeReal clone, or a habit tracker. It is a **social adventure game that turns real-world experiences into quests, memories, rewards, and community competition**. Avoid claiming no comparable product exists without market research.

---

### Feature coverage checklist

- [x] Personalized daily, weekly, monthly quests from a large bank
- [x] Different tasks for different users; small selection/rerolls
- [x] Three independent streaks and deadlines
- [x] Excitement/novelty progression rather than longer time requirements
- [x] Common/Rare/Epic/Legendary rarity and XP/Adventure Levels
- [x] Mystery chests, cosmetics, special quests, inventory
- [x] Quest Collections and Adventure Passport
- [x] Photo proof, optional voice notes, reactions
- [x] Friends/community feed and Try This Quest
- [x] Original FlarUp live map, with safer location defaults
- [x] Weekly shared quest and completion-order race points
- [x] Weekly/seasonal leaderboard views
- [x] City, state, country, global and optional campus rankings
- [x] Optional city-vs-city competition
- [x] Original Gemini/ElevenLabs recap and optional sponsor integrations
- [x] Phone + laptop demo, realistic MVP, architecture, team split

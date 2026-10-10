# FlarUp — Full Project Doc

Oct 10, 2026

## Overview

FlarUp is a daily social challenge app where a randomized alert fires once a day, users submit photo proof of completing the challenge, and every public profile shows up live on a global map — so you can see what strangers around the world are doing at the exact same moment.

**One-line pitch:** *BeReal met Google Maps and built something neither of them could.*

**Tracks:** General · Community · Best Use of ElevenLabs · Best Use of Gemini API · Best Use of Snowflake · Best Use of Tiger Data · Best Use of Solana · Best .Tech Domain

## The Problem

Social media is performative and asynchronous — you post a highlight reel hours after it happened, polished and filtered. BeReal cracked the authenticity code with spontaneous captures but stayed flat: no audio, no map, no shared challenge, no global community.

The deeper gap: there is no social platform where the core experience is *doing something in the real world* and seeing that you're not alone in it — right now, in real time, across the planet. People crave genuine shared experience but every existing app replaces it with passive scrolling.

FlarUp makes participation the product.

## Core Mechanic

Once a day, at a randomized time, every FlarUp user gets a push notification with a challenge. Everyone on the platform gets the **same challenge** that day — universal, no personalization. You have a **2-hour window** to complete it.

**What you submit:**
1. A photo as proof of completing the challenge
2. An optional voice note (processed through ElevenLabs voice filters)

**What happens after:**
- Your submission pins to the **Live Map** if your profile is public
- Friends can react with voice clips, not text
- An AI narrator recaps the day's best submissions in a personalized audio show

**Privacy model:**
- Public profile → your pin, username, photo, and approximate location appear on the global map
- Private profile → you participate and see the map but are invisible to strangers

The challenge is the same for everyone worldwide. That's the point — millions of people doing one thing simultaneously, visible to each other in real time.

## Feature Breakdown

### 🗺️ Live Map
A real-time global map showing every public submission from today's challenge. Pins show the user's photo thumbnail and username. Tapping a pin opens their submission and voice note. The map is the homepage — it's the first thing you see when you open the app.

### 📸 Challenge Submission
A camera interface that opens when the window is active. You capture your photo, optionally record a voice note (up to 30 seconds), and submit. No editing, no filters, no retakes — raw proof only.

### 🎙️ Voice Reactions
Instead of likes or text comments, friends react with short voice clips. ElevenLabs applies a subtle audio effect to all voice reactions so they feel distinct from a regular voice memo — part of the app's identity.

### 🤖 AI Challenge Narrator
At the end of each day, Gemini analyzes the day's submissions across your friend group and generates a personalized audio recap — a 60-second "highlight show" narrated by an ElevenLabs voice. Think SportsCenter but for your friends' weird daily challenges.

### 👥 Friends + Discovery
Add friends via username or QR code. Discover public strangers on the map. Follow public profiles to see their submissions in your feed alongside friends.

### 🏆 Streak & Token System
Complete the daily challenge every day to build a streak. Streaks earn Solana micro-tokens. Tokens unlock cosmetic profile features — voice filter packs, custom map pin styles, narrator voice options.

### 📊 Community Stats
Snowflake-powered dashboard showing global challenge participation — how many people completed today's challenge, which cities are most active, what time of day people tend to submit.

## Track Integration

| Track | How It's Used | Why It's Not Forced |
| --- | --- | --- |
| **General** | Core app — solves real social isolation through shared real-world experience | The map + challenge mechanic is the product |
| **Community** | Brings strangers together around a daily shared act — online and IRL | People doing the same thing at the same time *is* community |
| **ElevenLabs** | Voice reactions, pre-challenge audio narration, daily recap show voice | Audio is the reaction layer — replaces text comments entirely |
| **Gemini API** | Generates daily challenges, analyzes submissions for the recap, moderates content | The challenge content pipeline runs entirely on Gemini |
| **Snowflake** | Stores long-term participation data, powers the community stats dashboard | Longitudinal data shows trends across millions of submissions |
| **Tiger Data** | Real-time map updates — new pins appear within seconds of submission | The live map is useless without sub-second data freshness |
| **Solana** | Streak rewards paid as micro-tokens, redeemable for cosmetic unlocks | Turns daily habit into tangible reward without a payment processor |
| **.Tech Domain** | **flarup.tech** | Clean, memorable, available |

## MVP Scope — What to Build This Weekend

Build only what a judge can tap and experience in 2 minutes. Everything else is a slide.

**Must have (demo-able):**
- [ ] Daily challenge screen — shows today's challenge with a 2-hour countdown
- [ ] Camera capture + submission flow — photo + optional voice note
- [ ] Live map — shows mock + real submissions as pins, tappable
- [ ] ElevenLabs voice reaction — record and play back a voice reaction on a submission
- [ ] Gemini-generated challenge — one real API call that generates today's challenge text and reads it aloud via ElevenLabs
- [ ] AI daily recap — Gemini summarizes the day, ElevenLabs reads it back as a 60-second audio clip

**Nice to have if time:**
- [ ] Solana streak token — simulated earn on submission
- [ ] Snowflake community stats panel — participation count, top cities
- [ ] Friend add flow

**Leave for post-hackathon:**
- Real auth system
- Content moderation at scale
- Full Solana wallet integration
- iOS/Android native build

**Stack suggestion:** React frontend, Node backend, Mapbox or Leaflet for the map, Supabase for quick auth + storage, Tiger Data for real-time pins, Snowflake for stats.

## Technical Architecture

**Frontend:** React (web for demo) → Camera API for capture, Mapbox GL for live map, Web Audio API for voice playback

**Backend:** Node.js / Express → handles submission ingestion, challenge scheduling, token logic

**Real-time layer (Tiger Data):** Every submission writes a row with lat/lng, user id, timestamp → frontend polls or subscribes via websocket → map pins update within seconds

**AI pipeline (Gemini):**
1. Daily cron job hits Gemini API → generates challenge text for the day
2. End-of-day cron hits Gemini → analyzes submissions from your friend group → produces recap script
3. Recap script sent to ElevenLabs → returns audio file → served to user

**Voice layer (ElevenLabs):**
- Challenge narration: text-to-speech on challenge delivery
- Voice reactions: user records → ElevenLabs applies voice filter → stored as audio blob
- Daily recap: ElevenLabs voices the Gemini-generated script

**Analytics (Snowflake):** Submission events stream to Snowflake → aggregated queries power the community stats dashboard (participation rate, city heatmap, challenge completion by hour)

**Rewards (Solana):** On submission, backend calls Solana program → mints micro-token to user's wallet → wallet balance displayed in profile; redeemable for cosmetic unlocks stored on-chain

**Storage:** Supabase for user data + photo blobs; Tiger Data for real-time event stream; Snowflake for historical analytics

## Why This Doesn't Exist Yet

| App | What they do | What's missing |
| --- | --- | --- |
| BeReal | Spontaneous dual-camera captures | No challenge, no map, no voice, no shared act |
| Snapchat | Ephemeral messaging + stories | Performative, async, heavily filtered |
| Zenly (dead) | Friends on a live map | Passive location sharing, no challenge mechanic |
| Strava | Activity tracking on a map | Fitness only, no community challenge, no voice |
| YikYak | Anonymous local social | Text only, no map pins, no shared challenge |

No app combines: **universal daily challenge + photo proof + voice layer + live global map + real-time community stats + on-chain rewards.** Each exists in isolation. FlarUp is the first to make all five the same product.

The live map is the unlock nobody has built — it makes participation social in a way that a feed never can. You're not watching what someone did. You're seeing what 50,000 people are doing right now.

## Pitch & Judging Angle

**The hook (open with this):** Open the app live during the pitch. Show the map. If you have teammates or friends who submitted to a test challenge beforehand, their pins are on the map in real time. Judges see the product working, not a mockup.

**The story:** Social media made us watch each other's lives. FlarUp makes us live the same moment together.

**For Community track judges:** The daily challenge is inherently communal — it's a shared act that crosses every demographic, language, and timezone. The map makes that visible.

**For MLH track judges:**
- ElevenLabs: voice is the entire reaction and narration layer — not a feature, the medium
- Gemini: runs the challenge content pipeline and the daily recap show — not a chatbot, an editorial engine
- Snowflake: the stats dashboard shows data at real scale — not a demo table, a live query
- Tiger Data: the map is only possible because of sub-second writes — demo this live
- Solana: show the token mint on submission — open a block explorer and point at the transaction

**Closing line:** *"Every social app of the last decade asked you to watch. FlarUp asks you to show up."*
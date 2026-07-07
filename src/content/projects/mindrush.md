---
name: Mindrush
tagline: A real-time 1v1 brain game where two players race the same puzzle head-to-head — fastest mind wins.
summary: Built solo and live on the App Store. The hard part is trust — no client is ever believed. The server re-simulates every run through a shared deterministic engine, so scores, duels, and bots all pass through one authority.
role: Solo — clients, backend, realtime infra, game design, and launch
status: Live on the iOS App Store
statusKind: live
year: '2026'
platforms: [iOS, Android]
tier: 2
stack:
  [
    Kotlin Multiplatform,
    Compose Multiplatform,
    Ktor,
    PostgreSQL,
    Google Cloud Run,
    Firebase Realtime DB,
    kotlin-inject,
  ]
metrics:
  - Live on the iOS App Store
  - One KMP codebase → two platforms + a full backend
  - 300+ automated tests across client and server
  - Server-authoritative scoring — no trusted client
links:
  - label: App Store
    url: https://apps.apple.com/app/id6780897895
highlights:
  - Server-authoritative anti-cheat by re-simulation — the client submits only its input trace, and the server replays it through a shared deterministic match engine, discarding client-reported scores and rejecting superhuman (<120ms) and zero-variance bot cadences.
  - A cross-platform real-time 1v1 duel built on a Postgres-authoritative lobby state machine, with a two-phase compare-and-set start protocol that provably fires once and can't strand a player in a half-started match.
  - Synthetic opponents scored by the identical pipeline as humans — bots replay a generated pace profile through the same engine, so fairness is structural, not bolted on.
  - A weekly league system (6 tiers, cohort promotion/relegation, ISO-week-windowed XP computed lazily on read) plus a heartbeat presence subsystem routing duel invites to in-app banners or push.
---

## Overview

Mindrush is a competitive "match under pressure" brain game for iOS, with an
Android build from the same codebase. The core loop is a real-time 1v1 duel: two
players race the same puzzle at the same moment, and the faster, more accurate
player wins. I built the whole thing solo — clients, backend, realtime layer, and
the launch.

## The problem

A competitive, score-based game lives or dies on two things: **nobody can cheat
their score**, and **a live match has to feel instant and fair** even over
unreliable mobile networks.

Both are hard. Trusting the client is fatal for a leaderboard game. And a naive
"two clients talk to each other" duel is full of race conditions — who started, who
dropped, who forfeits. On top of that, the entire product had to run on one shared
codebase across iOS and Android, with no team.

## How I approached it

**One authority: server re-simulation.** The spine is a pure, deterministic match
engine written once in shared Kotlin. The client is never trusted with a score — it
submits only its tap trace, and the server re-runs that trace through the same
engine to derive the authoritative result, with plausibility checks (a
reaction-time floor, cadence-variance analysis, phantom-tap detection) that
invalidate implausible runs. That single decision — the server re-simulates
*everything* — is what makes both the leaderboard and the duels trustworthy.

**A duel that can't strand a player.** The live match is a Postgres-authoritative
lobby state machine: waiting room → ready-up → synchronized start. The database row
*is* the mutex, so a two-phase, single-fire compare-and-set guarantees exactly one
side wins the "start" transition; the opponent room is authored and confirmed before
the match clock ever begins. Firebase Realtime Database drives only the cosmetic
opponent view — never the source of truth.

**Bots that actually play.** When no human is available, a bot fills the slot — but
there's no separate, gameable "bot path." The bot replays a generated pace profile
through the same engine and is scored by the same re-simulation, so bot-filled
matches stay indistinguishable and fair.

**Shared everywhere it counts.** The clients are one Compose Multiplatform codebase
with kotlin-inject DI and a lambda-only MVI ViewModel layer, dropping to native
Swift only for platform bridges (realtime, image/GIF, push).

## Under the hood

A Ktor + PostgreSQL service on Google Cloud Run, Sign in with Apple / Google with
server-side JWKS verification, anonymous-first device identity, and 300+ automated
tests across client and server backing the whole thing.

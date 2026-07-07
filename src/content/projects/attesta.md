---
name: Attesta
tagline: A consent-first AI voice recorder — it records in-person conversations, plays an audible consent tone so everyone knows, and returns a speaker-labeled transcript with an AI summary, action items, and decisions.
summary: Solo-built and live on the App Store, running on iPhone, iPad, and Mac from a single Kotlin/Compose Multiplatform codebase, backed by a serverless Supabase + Deno backend with a server-as-sole-authority security model.
role: Solo — sole architect and engineer across the client, backend, infrastructure, and marketing site
status: Live on the App Store (v1.3.9)
statusKind: live
year: 2025 – present
platforms: [iPhone, iPad, Mac]
tier: 3
stack:
  [
    Kotlin Multiplatform,
    Compose Multiplatform,
    kotlin-inject,
    Supabase,
    Deno / TypeScript,
    Deepgram,
    StoreKit,
    DeviceCheck,
  ]
metrics:
  - Live on the App Store, iPhone · iPad · Mac from one codebase
  - 15-module Kotlin Multiplatform architecture
  - 8 deployed edge functions with an async, multi-pass AI insights pipeline
  - Server-as-sole-authority security model
links:
  - label: Website
    url: https://attesta.cc
  - label: App Store
    url: https://apps.apple.com/us/app/attesta-ai-voice-recorder/id6771519623
highlights:
  - One Kotlin / Compose Multiplatform codebase shipping to iPhone, iPad, and Mac, with a 15-module architecture and expect/actual platform layers.
  - A serverless backend of 8 deployed edge functions running an async, multi-pass AI insights pipeline (speech-to-text through to summary, action items, and decisions).
  - A server-as-sole-authority security model — schema-honeypot tamper detection, certificate pinning, and iOS device attestation — so the client is never the source of truth.
  - A DeviceCheck-bound, reinstall-proof free tier, plus an anonymous-session model that lets users try and even buy before creating an account, with their data transferred to the real account server-side on sign-in.
  - A privacy-and-consent-first positioning — an audible consent tone by design — in a category shaped by lawsuits over non-consensual transcription.
---

## Overview

Attesta is a consent-first AI voice recorder. It records in-person conversations,
plays an audible consent tone so everyone in the room knows recording is happening,
and returns a speaker-labeled transcript with an AI summary, action items, and
decisions. It's live on the App Store and runs on **iPhone, iPad, and Mac from a
single codebase**. I designed, built, and ship it end to end — client, serverless
backend, infrastructure, and marketing site.

## The idea

Most transcription tools treat consent as an afterthought — which is exactly why the
category keeps ending up in court over non-consensual recording. Attesta makes
consent *structural*: the audible tone isn't a setting, it's part of the product.
The technical challenge was doing that while delivering genuinely useful AI output
and keeping the whole system honest against a client that a determined user
controls.

## How I approached it

**One multiplatform core.** The app is a 15-module Kotlin Multiplatform / Compose
Multiplatform architecture with kotlin-inject DI and `expect`/`actual` platform
layers, shipping the same core to iPhone, iPad, and Mac.

**An async AI insights pipeline.** The backend is 8 deployed edge functions on
Supabase (Postgres + Deno/TypeScript) running a multi-pass pipeline: speech-to-text,
then successive passes that turn a raw transcript into a structured summary, action
items, and decisions.

**Server as the sole authority.** Nothing sensitive trusts the client. Tamper
detection uses a schema honeypot, transport is certificate-pinned, and entitlements
are gated by iOS device attestation — the server is the single source of truth for
what a user is allowed to do.

**Abuse-resistant free tier.** The anonymous free tier is bound to Apple DeviceCheck
so it's reinstall-proof rather than farmable. An anonymous-session model lets a user
try and even purchase *before* creating an account, with their data transferred to
the real account server-side on sign-in — so there's no friction wall in front of
the first valuable experience.

## An honest note

Attesta is a technically ambitious build that I ship and iterate on solo. It's a
craft project first — the interesting story here is the architecture and the
security model, not an adoption curve.

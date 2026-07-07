---
name: BeReel
tagline: A short-form video app where every clip is captured live in-app — no uploads, no AI-generated content — so what you watch is provably real footage.
summary: A solo-built iOS + Android app on one Kotlin/Compose Multiplatform codebase, built on the premise that authenticity should be structural, not promised. It needs a real cross-platform video editor and a server-authoritative gate — the two hardest problems in the product.
role: Solo — architecture, cross-platform client, backend, and infrastructure
status: In development · pre-launch
statusKind: development
year: 2025 – present
platforms: [iOS, Android]
tier: 4
stack:
  [
    Compose Multiplatform,
    MediaCodec + OpenGL,
    AVFoundation + Metal,
    Cloudflare R2 / Workers,
    AWS Rekognition,
    Supabase,
    SQLDelight,
  ]
metrics:
  - iOS bake time cut ~0.7s → under 0.05s per frame
  - A 30s clip export ~10 min → under a minute
  - Feed cold-start ~3s → ~1s
  - 13-module KMP architecture · 18 LUT filters
links:
  - label: Landing page
    url: https://bereel.app
highlights:
  - One Kotlin / Compose Multiplatform codebase producing a real video editor on both iOS and Android, with platform-specific GPU baking pipelines (MediaCodec + OpenGL on Android; AVFoundation + a Metal-backed CIContext on iOS) behind a shared expect/actual interface.
  - A frame-accurate multi-clip trim/concat pipeline that re-encodes across non-keyframe cut boundaries, eliminating the orphan-frame glitches that packet-level remuxing produces.
  - A server-authoritative moderation pipeline gating every upload before it can reach the feed, spanning Cloudflare Workers/Queues, AWS Lambda and Rekognition, and Supabase — with HMAC-signed callbacks and idempotent, retry-safe verdict writes.
  - A device-attestation-backed authenticity engine — Apple App Attest and Google Play Integrity confirm a genuine, unmodified app on a real device before upload-provenance signals are scored.
  - A hand-written AWS SigV4 signer in pure Kotlin so Cloudflare R2 multipart uploads behave identically on both platforms.
---

## Overview

BeReel is a short-form video platform built on a single premise: **authenticity
should be structural, not promised.** Content can only be captured live through the
in-app camera — no uploads, no AI-generated media — so the feed is, by construction,
real human footage. It's a solo-built iOS + Android app sharing one Kotlin/Compose
Multiplatform codebase, with a Supabase backend and a server-side moderation and
authenticity layer. It's **in active development, pre-launch.**

## The problem

Two hard problems sit at the center.

**"No uploads" forces the app to be a real video editor.** Record, multi-clip trim,
filter, overlay text and stickers, and permanently bake all of that into a shipped
MP4 — twice, once per platform, from a single shared codebase, and fast enough that
users don't quit mid-export.

**"This is real" can't be a client-side honor system.** A platform whose entire
value proposition is authenticity cannot trust the client. The gate has to live on
the server and survive a reverse-engineer holding the app binary.

## How I approached it

**A hand-built editor.** The editor is a pure-Canvas NLE timeline with an
`EditorMode` state machine that gives exactly one owner of playback position per
mode, avoiding the race conditions that plague scrub/trim/play interactions.
Overlays run through a single shared gesture pipeline (hit-testing, drag,
pinch-zoom, two-finger rotate) that any new overlay kind plugs into via a spec.

**Pixel-perfect, fast baking.** A `GraphicsLayer` captures the exact Compose overlay
rendering to a PNG, which is then GPU-composited over each decoded video frame. The
original iOS path was CPU-only — about 0.7s per frame, roughly ten minutes for a
30-second clip, a genuine ship-blocker. Moving to a Metal-backed `CIContext` brought
it under 0.05s per frame. Multi-clip stitching re-encodes only across cut
boundaries, so non-keyframe cuts stay frame-accurate.

**A server-authoritative gate.** Every upload lands in R2, fires an event to a
Cloudflare Queue, and is copied to S3 by a Lambda that calls back over an
HMAC-signed request. Rekognition scans asynchronously; the verdict is written to
Supabase via a service role, with Row-Level Security hiding in-flight uploads from
everyone but the author. In parallel, hardware-backed attestation (App Attest / Play
Integrity) plus a modular provenance-signal engine scores each post into a verdict,
logging every observation immutably.

## Where it stands

The core loop is feature-complete. This is honest, deliberate scoping: it isn't on
any app store yet, and legally required safety infrastructure (CSAM detection) is
still to be wired before any public launch. What's shipped is the editor, the
baking pipelines, the server-side moderation pipeline, and the
device-attestation-backed authenticity engine.

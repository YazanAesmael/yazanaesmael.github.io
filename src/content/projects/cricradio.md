---
name: CricRadio
tagline: A live cricket app with 100,000+ users — real-time scores, ball-by-ball commentary, and a floating match overlay.
summary: I lead frontend engineering (Android & iOS) on CricRadio, and I'm driving its migration from a native Android app to a shared Kotlin Multiplatform + Compose Multiplatform codebase — without pausing a single production release.
role: Lead engineer — Android & iOS frontend, and the KMP migration
status: Live on Google Play · iOS migration in progress
statusKind: live
year: 2023 – present
platforms: [Android, iOS in progress]
tier: 1
stack:
  [
    Kotlin Multiplatform,
    Compose Multiplatform,
    Ktor WebSockets,
    kotlin-inject,
    Coroutines,
    Firebase,
    GitHub Actions,
  ]
metrics:
  - 100,000+ users on a live production app
  - 36 Gradle modules (10 core · 23 feature)
  - Monolithic API surface cut 49 → 6 methods
  - Zero interruption to Play Store releases during migration
links:
  - label: Google Play
    url: https://play.google.com/store/apps/details?id=com.lifease.cricradio
highlights:
  - Incremental KMP migration of a live app with zero interruption to Android production releases — CI keeps shipping AABs to Google Play throughout the refactor.
  - Replaced Hilt with a custom, framework-agnostic dependency-injection approach (kotlin-inject, a "providers-only" pattern, CompositionLocal-resolved ViewModel factories) so feature modules carry zero DI annotations.
  - Rebuilt the real-time layer — live scores, win-probability and session markets — on Ktor WebSockets + kotlinx.serialization, feeding an Android floating-overlay service that renders a live match over other apps.
  - Turned the iOS/Native compiler into a safety gate for extracting shared code, after finding that a green Android build silently hides undeclared platform dependencies.
  - Ran large, risky sweeps rigorously — coroutine-cancellation safety across 55 call sites in 37 files, JVM→Kotlin date/time, and a hand-built 35-icon vector set to clear a dependency wall.
---

## Overview

CricRadio is a live cricket app on Google Play — real-time scores, ball-by-ball
commentary, win-probability and session markets, scorecards and highlights. Its
standout feature is a pinnable floating overlay that keeps a live match on screen
while you use other apps.

I lead frontend engineering across Android and iOS. The engineering story I'm
proudest of is turning a shipping, Android-only product with a six-figure user
base into a Kotlin Multiplatform codebase that will also run on iOS — **without
pausing releases or rewriting from scratch.**

## The problem

The app was built the idiomatic Android way: Hilt for dependency injection,
Socket.IO for real-time, `java.time`/`Build`/`System` throughout, Android resource
references, and a feature graph tightly bound to Android UI. Every one of those
choices is a wall for code sharing.

The constraint was unforgiving: reach a shared `commonMain` that compiles for iOS
**while the Android app keeps shipping to production every release.** That meant the
migration had to be incremental and provably safe at each step — not a big-bang
rewrite that goes dark for months.

## How I approached it

**Modularization first.** I split the app into 10 `core` and 23 `feature` modules
with a callback-inversion navigation pattern: features receive navigation as
lambdas and depend on no navigation library and on no sibling feature. That broke
the tight coupling that makes shared code impossible.

**A framework-agnostic DI swap.** I moved the whole graph from Hilt to
kotlin-inject using a "providers-only" pattern and CompositionLocal-resolved
ViewModel factories, so feature code carries zero DI annotations and no framework
lock-in.

**The iOS compiler as a safety gate.** The key insight of the whole migration: the
Android target compiles `commonMain ∪ androidMain` as one unit, so it silently
satisfies dependencies and symbols that shared code never actually declared. A
green Android build proves *nothing* about portability — only compiling a
non-Android target does. I extracted `commonMain` wave by wave and gated every wave
on the iOS/Native compiler, which caught whole categories of latent breakage
(module dependencies stranded in `androidMain`, JVM-only APIs, Android resource
references) before they could become iOS blockers.

**Platform seams and real-time.** Services that can't be shared — overlay
permission, notification permission, toasts, device info, screen-view logging —
went behind `expect`/`actual` seams. The real-time layer moved from Socket.IO to
Ktor WebSockets with kotlinx.serialization.

## Impact

Alongside the migration, the app was tuned hard for performance: roughly **90% less
UI jank**, **~50% faster startup** (R8, Baseline Profiles, disciplined Compose), and
**~95% smaller server payloads** (full-stack GZIP, custom key encoding, ETag
caching). CI/CD on GitHub Actions cut deployment time ~40%, and the app benchmarks
as the fastest in its class.

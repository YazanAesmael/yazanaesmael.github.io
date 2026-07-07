---
name: Enterprise Inventory & Traceability
tagline: A handheld inventory and store-transfer Android app for a Fortune-500 US grocery retailer, run by warehouse and store staff on rugged barcode scanners.
summary: As the freelance feature developer on a small team, I owned the hardest piece — a barcode-scan validation pipeline that lets modal UI block and resume mid-scan without ever dropping or double-counting a scan — plus a domain-model migration across the codebase.
role: Freelance feature developer on a ~3-person team, under PR review
status: Private · closed-source enterprise app
statusKind: private
year: 2024 – 2025
platforms: [Android]
tier: 6
stack:
  [
    Kotlin,
    Jetpack Compose,
    Material 3,
    Coroutines (Channels / Flow),
    Hilt,
    Multi-module,
    SonarQube,
  ]
metrics:
  - Sealed-interface domain migration across ~24 files / 8 modules
  - All 3 Material 3 sheet-dismissal paths guarded
  - Shipped against coverage + static-analysis quality gates
  - Targeting Zebra rugged handheld scanners
highlights:
  - A sequential barcode-scan validation pipeline built on coroutine Channels (a scan queue plus an interaction gate) that serializes GS1 parsing, network lookups, and eligibility checks — letting Compose dialogs and bottom sheets block and resume mid-scan without dropped or duplicated scans.
  - A core domain-model migration from a data class to a sealed interface, propagated across ~24 files and 8 Gradle modules, resolving generic-variance friction in a wrapper type parameterized over the interface.
  - An unsaved-changes guard for Material 3 bottom sheets that intercepts all three dismissal paths (pull-to-close, scrim tap, system back), using rememberUpdatedState to avoid stale lambda captures.
  - A resume-or-discard draft-recovery flow for interrupted store transfers, replacing a temporary alert with a proper recovery experience.
---

## Overview

A multi-module Android app for enterprise inventory management and food
traceability, used by store and warehouse staff on rugged Zebra handheld scanners.
It covers store-to-store transfers (shipping and receiving), order review, and
barcode-driven item capture with regulatory eligibility checks. I joined **a
Fortune-500 US grocery retailer's** project as the freelance feature developer on a
small team, owning delivery of the scanning, domain-model, and UI-state work under
pull-request review and automated quality gates.

## The problem

The hard part was reliable barcode capture under real-world conditions. Each scan
kicks off a chain of async steps — format parsing, a network lookup, an eligibility
validation, missing-field prompts — and any step can require blocking the user for
input via a dialog or bottom sheet. Naive handling drops or double-counts scans when
validations overlap or a user dismisses a prompt.

On top of that, the shared domain model had to serve two very different feature
areas without collapsing into a god-object, and Compose's sheet/dialog dismissal
behavior actively fights you when you need to guard unsaved work.

## How I approached it

**A serialized scan pipeline.** I ran the whole flow through coroutine Channels: a
scan queue feeds one item at a time into a pipeline (parse → network lookup →
eligibility check → lot-code presence), and an interaction gate pauses the pipeline
whenever a validation needs user input. Rejection dialogs and data-entry bottom
sheets emit back into the same gate, so the queue resumes cleanly and duplicate
scans merge by count instead of piling up.

**A sealed-interface domain migration.** I refactored the core `Item` model from a
data class into a sealed interface with two concrete variants sharing a single
computed quantity — which meant touching ~24 files across 8 modules and handling
generic-variance friction where a wrapper type was parameterized over the interface.

**Compose state safety.** I guarded Material 3 bottom sheets against accidental
dismissal by intercepting three separate dismissal paths — each needs a different
mechanism in Compose — and wrapped the confirm callback in `rememberUpdatedState` to
avoid stale captures.

Everything shipped under coverage and static-analysis gates, with
cognitive-complexity issues resolved by extracting pure functions and composables
rather than suppressing warnings.

## Note

This is client work under NDA. The client, its brands, and internal identifiers are
withheld; it's described here only in anonymized, role-based terms.

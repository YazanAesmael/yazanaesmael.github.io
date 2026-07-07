---
name: OpenSurvey
tagline: An open-source Android SDK for talking to field-survey hardware over Bluetooth Low Energy and USB — extracted from a production RTK surveying app.
summary: A reusable, UI-independent hardware-communication SDK that abstracts external survey devices behind one interface, with interchangeable BLE and USB transports. It's the open-sourced core of a private, offline-first RTK surveying app I built solo.
role: Author — extracted and open-sourced from my own production app
status: Open source · public on GitHub
statusKind: open-source
year: 2025 – 2026
platforms: [Android]
tier: 5
stack:
  [Kotlin, Android BLE (GATT), USB Host, Hilt, Coroutines / Flow, Jetpack Compose]
metrics:
  - Reusable :sdk module with a Compose/Material 3 demo app
  - ~630-line BLE stack over the Nordic UART Service
  - Dual-transport — BLE and USB behind one interface
  - Full GATT lifecycle with MTU negotiation and fallback
links:
  - label: GitHub
    url: https://github.com/YazanAesmael/OpenSurvey
highlights:
  - A white-label Android surveying SDK that abstracts external field hardware behind a single interface, with interchangeable BLE and USB transports and runtime switching between them.
  - A ~630-line BLE stack over the Nordic UART Service — full BluetoothGatt lifecycle, LE scan with timeout, MTU negotiation with fallback, and notify/indicate characteristic streaming.
  - Structured as a reusable, UI-independent :sdk module (interface/impl split, Hilt DI, coroutines/Flow) with a thin Compose/Material 3 demo app, packaged via buildSrc convention plugins.
  - Extracted from a private production app so the hard hardware-communication layer can be reused independently of any one product.
---

## Overview

OpenSurvey is an open-source Android SDK for communicating with external
field-survey hardware over **Bluetooth Low Energy and USB**. It abstracts the device
behind a single interface, so an app can talk to survey hardware without caring which
transport is connected — and switch between them at runtime.

It isn't a toy. The SDK is the **open-sourced core of a private, production,
offline-first RTK surveying application I built solo** — the reusable hardware layer,
lifted out so it can stand on its own.

## The origin

The private parent app is a professional-grade field-surveying tool: field
surveyors capture survey-grade GNSS points against RTK base stations, manage clients
and sections, and sync securely — all offline-first, with a complete local audit
trail. The genuinely hard, reusable part of that system is the hardware
communication: reliably driving a BLE/USB survey device through a real GATT
lifecycle, MTU negotiation, and command framing, with the quirks that only show up
against physical hardware.

Rather than let that live locked inside one proprietary app, I factored it into a
clean, standalone SDK and open-sourced it.

## What's in it

- **A dual-transport core.** `BLE` and `USB` connection managers sit behind a single
  `HardwareCommunicationManager` orchestrator, so consumers get one API regardless
  of transport.
- **A real BLE implementation.** Roughly 630 lines over the Nordic UART Service: the
  full `BluetoothGatt` lifecycle, LE scanning with a timeout, MTU negotiation with a
  fallback path, and notify/indicate characteristic streaming.
- **Clean, reusable structure.** A UI-independent `:sdk` module with an
  interface/implementation split and Hilt DI, plus a thin Compose + Material 3 demo
  app, packaged with `buildSrc` convention plugins and a version catalog.

## Why it matters

Most "hardware integration" on a résumé means calling a vendor SDK. This is the
layer *underneath* that — the part that actually negotiates with the radio and the
wire — designed well enough to extract, document, and hand to other developers.

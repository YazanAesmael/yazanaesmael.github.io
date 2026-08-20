---
name: Cutaway
tagline: A video editor you can talk to. The agent works the same timeline you do — with the same tools — and every frame it touches is still yours to change.
summary: Every competitor is one thing or the other. CapCut is a manual timeline; the AI tools are one-shot generators you can't fix. Cutaway is both — a conversational agent holding the same 16-tool editing surface as the manual editor, on top of a rendering engine that runs entirely on the device. iPhone, Android and desktop from one Kotlin Multiplatform core.
role: Solo — apps, agent, rendering engine, server, and the marketing site
status: Launching soon · App Store first, Android to follow
statusKind: development
year: '2026'
platforms: [iOS, Android, Desktop]
tier: 4
stack:
  [
    Kotlin Multiplatform,
    Compose Multiplatform,
    Koog agent,
    MediaCodec + OpenGL,
    AVFoundation + Metal,
    Ktor + PostgreSQL,
    SQLDelight,
  ]
metrics:
  - 13-module architecture — iOS, Android and desktop from one shared core
  - 16 agent tools spanning the same surface as the manual editor
  - Editing runs on-device — only the model conversation leaves the phone
  - 18 LUT filters · 15 transitions · keyframable transforms
links:
  - label: Website
    url: https://cutaway.design
highlights:
  - The agent is a collaborator, not a generator. It holds 16 tools across the same surface a person uses — inspect the project, probe individual frames, transcribe a clip, apply arbitrary edits, generate music, sound effects and voiceover, tune caption motion and timing, and mix clip, music and master volume. You talk to it, and anything it decides is still editable by hand afterwards.
  - One codebase, three clients — Android, iOS and a desktop JVM app — with adaptive layouts and platform-specific seams rather than a lowest-common-denominator UI. Every client module targets all three.
  - The whole editing engine runs on-device behind a single expect/actual seam — MediaCodec, EGL and OpenGL on Android; AVAssetReader/Writer with a Metal-backed CIContext on iOS — so footage is never uploaded to a render pipeline.
  - The agent watches the footage rather than reading a transcript. It samples frames and looks at them, so it works on video with no dialogue at all, and transcribes only where there is speech worth cutting on.
  - A reel is a document of intent, not a file. It names media and ranges; source footage is immutable, so "make that yellow instead" is a re-render rather than a redo, and a long conversation never degrades its own footage.
  - A Ktor and PostgreSQL service — written in the same codebase, sharing the domain model with the apps — keeps model credentials off the device and handles anonymous-first identity and credit metering, so a fresh install works before anyone signs in.
---

## Overview

Cutaway is a mobile and desktop video editor where an agent does the editing. You
start a project, add footage, and talk to it — *"start with me working, cut to the
coffee break, then back again, black and white, caption each one."* It looks at the
clips, decides the cuts, writes the captions, scores it, and renders it.

Then it hands you the timeline, and nothing it did is locked.

## The problem

Video tools had split into two camps that each fail differently.

**Manual editors** — CapCut and everything like it — give you complete control and
a learning curve, and most of the work is repetitive: find the moment, cut, trim,
caption, repeat. **AI tools** generate something in one shot and then abandon you.
If the third cut is wrong there is no third cut to fix, only a prompt to run again
and a different video to hope about.

I wanted a tool where the agent is a *collaborator* rather than a vending machine:
it does the tedious work, I keep every frame, and asking for a change is a
conversation rather than a reroll. That means the agent and a real editor have to
operate on the same document with the same capabilities — which is an architecture
problem long before it is a product one.

## How I approached it

**The agent gets the editor's tools, not a special path.** Sixteen tools cover the
same surface a person works with: reading the project and individual ranges,
probing frames, transcribing a clip, applying edits, generating music, sound
effects and voiceover, setting caption motion and timing, and mixing clip, music
and master volume. There is no "agent mode" that produces something the timeline
can't express.

**One renderer, two callers.** The manual baking screen and the agent both drive
the same `ReelRenderer`. That sequence used to exist twice and drifted, which once
produced a perfectly correct file that nothing pointed at. Collapsing it to one
path is what makes "the agent did it" and "I did it" indistinguishable downstream.

**A reel is a document, not a file.** It holds an ordered timeline of segments,
each naming a media item and a range within it, plus filters, overlays and mute.
Rendering reads that document and writes a *new* file; there is no API to modify
source media. That immutability is what makes an edit re-editable, and what stops a
long back-and-forth from slowly degrading the footage it started from.

**Three clients, one core.** Every client module targets Android, iOS and desktop
JVM. The shared code carries the model, data, agent, player and design system;
adaptive layouts and expect/actual seams handle what genuinely differs — a phone
timeline and a desktop editor are not the same interface, and pretending otherwise
is how multiplatform apps end up feeling like neither.

**On-device by construction.** Both mobile platforms bake behind a single
expect/actual seam: MediaCodec into an OpenGL context on Android, AVAssetReader and
Writer with a Metal-backed `CIContext` on iOS. Compose overlays are captured
offscreen through a `GraphicsLayer` and composited at bake time, so the export
matches the preview exactly. The privacy claim is a consequence of the architecture,
not a policy.

**Keys off the device.** A Ktor and PostgreSQL service, written in the same
codebase and sharing the domain model with the apps, holds the model credentials,
mints anonymous-first identities so a fresh install works before anyone signs in,
and meters credits. Nothing secret ships in the binary.

## Where it stands

Android works end to end — record or import, talk to the agent, get a rendered reel,
export to the gallery — iOS runs on device, and the desktop build runs on macOS.
It's in the store-readiness stretch now: **App Store first, Android to follow.**

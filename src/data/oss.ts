/**
 * Compact open-source cards. Small, link-out projects that round out the story.
 * To add one (e.g. RealHandsFree), copy an entry. `stars` is optional — only
 * set it where the count actually helps; omit it otherwise (never inflate).
 */

export type OssItem = {
  name: string;
  description: string;
  tech: string[];
  url: string;
  stars?: number;
};

export const oss: OssItem[] = [
  {
    name: 'JetOverlay',
    description:
      'A lightweight, Compose-first Android overlay SDK — physics-based dragging, isolated Lifecycle/ViewModel scopes, and Foreground Service persistence, packaged as a reusable AAR.',
    tech: ['Jetpack Compose', 'WindowManager', 'Foreground Service', 'AAR'],
    url: 'https://github.com/YazanAesmael/JetOverlay',
    stars: 18,
  },
  {
    name: 'EchoVerse',
    description:
      'A Kotlin Multiplatform app that builds "digital twins" from chat history — an on-device RAG pipeline with agent workflows for context-aware persona simulation.',
    tech: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Koog', 'On-device RAG'],
    url: 'https://github.com/YazanAesmael/EchoVerse',
  },
  {
    name: 'kmp-skeleton',
    description:
      'A clean, modular Kotlin Multiplatform starter — centralized dependency and build management via Gradle convention plugins, ready to build on.',
    tech: ['Kotlin Multiplatform', 'Gradle convention plugins', 'Modular'],
    url: 'https://github.com/YazanAesmael/kmp-skeleton',
  },
];

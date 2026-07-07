/**
 * Skills, grouped. Edit freely — the Skills section renders whatever is here.
 * Keep it honest: only list what you'd be comfortable being interviewed on.
 */

export type SkillGroup = { title: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    title: 'Languages',
    items: ['Kotlin', 'Java', 'Swift', 'TypeScript', 'C++ (embedded)', 'Python'],
  },
  {
    title: 'Mobile & Multiplatform',
    items: [
      'Jetpack Compose',
      'Compose Multiplatform',
      'Kotlin Multiplatform (KMM / CMP)',
      'SwiftUI',
      'Coroutines & Flow',
      'Dagger Hilt',
      'kotlin-inject',
      'Koin',
      'Material 3',
    ],
  },
  {
    title: 'Architecture',
    items: [
      'Clean Architecture',
      'MVVM / MVI / UDF',
      'Multi-module composition',
      'expect / actual',
      'Gradle convention plugins',
      'Offline-first sync',
    ],
  },
  {
    title: 'Backend & Infra',
    items: [
      'Ktor (client + server)',
      'PostgreSQL',
      'Supabase (Postgres, Edge Functions, RLS, Storage)',
      'Cloudflare Workers + R2',
      'Firebase',
      'REST / WebSockets',
      'Google Cloud Run',
    ],
  },
  {
    title: 'Security & Reverse Engineering',
    items: [
      'Frida',
      'Ghidra',
      'JADX',
      'APKTool',
      'angr (native .so analysis)',
      'Static / dynamic analysis',
      'Anti-tamper',
      'Certificate pinning',
      'Device attestation',
    ],
  },
  {
    title: 'Hardware',
    items: [
      'BLE',
      'Bluetooth Classic',
      'CoreBluetooth',
      'ESP32 / Arduino firmware',
      'USB',
      'Device sensors',
      'Real-time sockets',
    ],
  },
  {
    title: 'AI Engineering',
    items: [
      'Agentic coding workflows',
      'MCP / connectors',
      'On-device RAG',
      'LLM agent tooling',
      'Disciplined AI-code review',
    ],
  },
  {
    title: 'DevOps & Quality',
    items: [
      'GitHub Actions',
      'GitLab CI',
      'TestFlight',
      'Play Store',
      'SonarQube',
      'Android Profiler',
      'LeakCanary',
      'JUnit',
      'Espresso',
    ],
  },
];

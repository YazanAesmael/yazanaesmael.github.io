/**
 * Work history (role-based) + education.
 * `summary` shows in concise view; `details` bullets show in deep view.
 * Client work stays anonymized here — never name NDA clients.
 */

export type Role = {
  role: string;
  company: string;
  dates: string;
  type: string;
  summary: string;
  details: string[];
};

export const experience: Role[] = [
  {
    role: 'Lead Android Engineer',
    company: 'Lifease Solutions',
    dates: 'Nov 2023 – present',
    type: 'Remote · full-time',
    summary:
      'Lead frontend engineer (Android & iOS) on CricRadio, a live cricket app with 100,000+ users — driving its migration to Kotlin Multiplatform + Compose Multiplatform while it keeps shipping to production.',
    details: [
      'Lead frontend for both Android and iOS, and architect of the in-progress migration from a native Android codebase to a shared Kotlin Multiplatform + Compose Multiplatform core.',
      'Built the real-time layer (live scores, win-probability, session markets) and an Android floating-overlay service that renders a live match over other apps.',
      'Tuned performance hard: ~90% less UI jank, ~50% faster startup, ~95% smaller server payloads; built CI/CD on GitHub Actions that cut deployment time ~40%.',
      'Mentored two junior engineers to independence.',
    ],
  },
  {
    role: 'Independent Engineer & Consultant',
    company: 'Freelance',
    dates: 'Dec 2023 – present',
    type: 'Remote · contract',
    summary:
      'Senior mobile contract work across enterprise Android, cross-platform ports, and authorized Android security assessments — delivered under NDA and presented here only in anonymized terms.',
    details: [
      'Owned feature delivery on an enterprise inventory & food-traceability Android app for a Fortune-500 US grocery retailer, deployed on rugged handheld scanners across stores.',
      'Ported a BLE-driven real-time tracking app from Android-only to full Android + iOS production parity (CoreBluetooth on the iOS side).',
      'Authorized Android attack-surface analysis and reverse engineering (Frida, Ghidra, JADX, APKTool) under a security retainer; engagement scope kept private.',
    ],
  },
  {
    role: 'Android Engineer',
    company: 'TestRight Nanosystems',
    dates: 'Jul 2023 – Aug 2023',
    type: 'Remote',
    summary:
      'Built an end-to-end biotech data-capture system — both the Android client and the ESP32 firmware in C++ for low-latency telemetry.',
    details: [
      'Wrote the ESP32 firmware in C++ for low-latency telemetry, paired with an Android client.',
      'Real-time graphing of spectrometer data at high refresh rates with no dropped frames.',
    ],
  },
];

export const education = {
  degree: 'B.Tech, Computer Science & Engineering (Information Technology)',
  school: 'Kalinga Institute of Industrial Technology (KIIT)',
  location: 'Bhubaneswar, India',
  year: '2023',
};

const patchNotes = [
  {
    head: "**Setting Background**",
    date: "2025-06-26",
    notes: [
      "Added color picker to Settings for background customization.",
    ]
  },
  {
    head: "**Weather App**",
    date: "2025-06-22",
    notes: [
      "Now weather prediction can track user's local time.",
      "Added Weather 🌙 sticker when its night time."
    ]
  },
  {
    head: "**Patch App**",
    date: "2025-06-21",
    notes: [
      "Patch App officially added to system."
    ]
  },
  {
    head: "**News & Weather**",
    date: "2025-06-21",
    notes: [
      "Added toggle between Celsius and Fahrenheit."
    ]
  },
  {
    head: "**News & Weather**",
    date: "2025-06-18",
    notes: [
      "Temperature detection now uses user's location.",
      "Integrated into News app."
    ]
  },
  {
    head: "**News & Weather**",
    date: "2025-03-15",
    notes: [
      "Added News icon to taskbar.",
      "Displays latest news articles fetched from backend."
    ]
  },
  {
    head: "**Apps**",
    date: "2025-03-01",
    notes: [
      "Started AiAgent project."
    ]
  },
  {
    head: "**Apps**",
    date: "2025-02-20",
    notes: [
      "Added Paint app using [jspaint](https://github.com/1j01/jspaint) library."
    ]
  },
  {
    head: "**System Functionality Updates**",
    date: "2025-02-16",
    notes: [
      "Right-click enabled on icons in Recycle Bin.",
      "Restore deleted icons to original position."
    ]
  },
  {
    head: "**System Functionality Updates**",
    date: "2025-02-13",
    notes: [
      "Right-click added to desktop icons.",
      "Mobile long-press support added for context menu."
    ]
  },
  {
    head: "**System Functionality Updates**",
    date: "2025-01-26",
    notes: [
      "Added 'My Computer' icon.",
      "Started work on file system architecture."
    ]
  },
  {
    head: "**Settings**",
    date: "2025-01-19",
    notes: [
      "Added effect pattern options to Settings."
    ]
  },
  {
    head: "**MSN Chat App**",
    date: "2025-01-10",
    notes: [
      "MSN chat now uses WebSocket for faster communication.",
      "Reconnects automatically after navigation or reload."
    ]
  },
  {
    head: "**Footer & Clock**",
    date: "2025-01-05",
    notes: [
      "Icon size is now adjustable via clock footer button."
    ]
  },
  {
    head: "**Bitcoin Tracker**",
    date: "2024-12-05",
    notes: [
      "Added BTC real-time tracker via Coinbase WebSocket.",
      "Icon celebrates $100K milestone and is toggleable on tab bar."
    ]
  },
  {
    head: "**Notifications**",
    date: "2024-11-22",
    notes: [
      "Added launch-time system notification and animation.",
      "Pop-up message now appears when new MSN message arrives (even when closed)."
    ]
  },
  {
    head: "**MSN Chat App**",
    date: "2024-11-20",
    notes: [
      "Live MSN chat app built with Node, Express, MongoDB.",
      "Session expiration key added to block spam.",
      "Server-side filter and auto-deletion of spam enabled."
    ]
  },
  {
    head: "**Drag-and-Drop Feature**",
    date: "2024-11-15",
    notes: [
      "Icons can be dragged into folders.",
      "Bug fixed where dragging out of folder caused layout bugs using key-based container re-mount.",
      "Icon state now saved to localStorage."
    ]
  },
  {
    head: "**Settings**",
    date: "2024-11-18",
    notes: [
      "Wallpaper selection now available in Settings.",
      "Theme updates automatically with wallpaper."
    ]
  },
  {
    head: "**System Functionality Updates**",
    date: "2024-11-06",
    notes: [
      "Start menu now supports subfolders (Windows 95 style)."
    ]
  },
  {
    head: "**Mini-Games**",
    date: "2024-11-01",
    notes: [
      "Minesweeper game added.",
      "Flags can be placed directly on desktop tiles."
    ]
  },
  {
    head: "**Interactive Components**",
    date: "2024-10-25",
    notes: [
      "Login page added with Mario animation.",
      "Clicking '?' increases Mario’s size."
    ]
  },
  {
    head: "**Interactive Components**",
    date: "2024-10-20",
    notes: [
      "Added shutdown button with options: Shutdown, Restart, Log Out.",
      "Shutdown animation integrated."
    ]
  },
  {
    head: "**Footer & Clock**",
    date: "2024-10-30",
    notes: [
      "Clicking on clock opens calendar widget."
    ]
  },
  {
    head: "**Run Command**",
    date: "2024-10-04",
    notes: [
      "Run command window added.",
      "Fully functional with error handling for incorrect file names."
    ]
  },
  {
    head: "**Clippy Assistant**",
    date: "2024-09-26",
    notes: [
      "Clippy assistant introduced with motivational speeches.",
      "Clippy now gives context-aware advice when interacting with components."
    ]
  },
  {
    head: "**UI Framework**",
    date: "2024-08-25",
    notes: [
      "Drag and Drop window support added.",
      "Start Menu UI created.",
      "Windows now resizable and support shrink/expand.",
      "Icons support single-click highlight and double-click open.",
      "Double-click also works on mobile using useState time-check logic."
    ]
  }
];


export default patchNotes;

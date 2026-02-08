const patchNotes = [
  {
    head: "**IE**",
    date: "2026-02-08",
    notes: [
      "Added IE project, a web browser that can browse the internet",
      "Intregated Back and Forward button to IE project",
      "Added Stop and Refresh button to IE project",
      "Added Home button to IE project",
    ]
  },
  {
    head: "**Pixel Pic**",
    date: "2026-01-04",
    notes: [
      "Added new project, pixel pic, a pixel art converting app",
    ]
  },
  {
    head: "**Footer**",
    date: "2025-11-05",
    notes: [
      "Now icon will be added and delete dynamically, and width will be adjusted automatically",
      "New icon will be able to be added on the footer bottom right corner"
    ]
  },
  {
    head: "**Store**",
    date: "2025-11-02",
    notes: [
      "All apps are now able to install and uninstall in the store",
    ]
  },
  {
    head: "**Tile**",
    date: "2025-11-02",
    notes: [
      "All the apps that being installed or uninstalled are now being add or remove on Tile as well",
    ]
  },
  {
    head: "**Store**",
    date: "2025-11-02",
    notes: [
      "All the apps in Store are now free to install",
      "Animation will be added when installing apps from Store",
    ]
  },
  {
    head: "**Bin**",
    date: "2025-10-29",
    notes: [
      "Added confirmation before permanently delete file",
    ]
  },
  {
    head: "**Store**",
    date: "2025-10-30",
    notes: [
      "Added Store icon",
    ]
  },
  {
    head: "**Google Toggable Search Bar**",
    date: "2025-10-03",
    notes: [
      "Added togglable Google Search bar ",
    ]
  },
  {
    head: "**Right click pannel**",
    date: "2025-10-02",
    notes: [
      "Added sorting icon right click",
      "Each folder's icons can be sorted by name",
    ]
  },
  {
    head: "**MSN APP**",
    date: "2025-09-20",
    notes: [
      "Add MSN nudge sound effect",
      "Send nudge to server and broadcast to all clients",
      "Nudge shakes the chat window",
    ]
  },
  {
    head: "**BTC Widget**",
    date: "2025-08-30",
    notes: [
      "Add bitcoin chart",
      "Re-design BTC widget",
    ]
  },
  {
    head: "**Recycle Bin**",
    date: "2025-08-24",
    notes: [
      "User now can now permanently delete files on recycle bin",
    ]
  },
  {
    head: "**System**",
    date: "2025-08-21",
    notes: [
      "User now can create Folders",
      "Folders and items can be dropped into created folders"
    ]
  },
  {
    head: "**Added Task Manager**",
    date: "2025-08-14",
    notes: [
      "Added Task Manager app.",
      "Can view and manage running programs.",
    ]
  },
  {
    head: "**MSN App**",
    date: "2025-08-03",
    notes: [
      "Added Reconnect to chat"
    ]
  },
  {
    head: "**Tile grid App**",
    date: "2025-07-31",
    notes: [
      "Added Icons"
    ]
  },
  {
    head: "**Tile grid App**",
    date: "2025-07-30",
    notes: [
      "Added fetching background from tile screen mode with toggle on/off"
    ]
  },
  {
    head: "**Added Tile grid App**",
    date: "2025-07-27",
    notes: [
      "Added Tile grid App",
      "More feature will be added later..",
      "Inspred by Windows 10 and Windows phone",
    ]
  },
  {
    head: "**NEW FORTUNE APP**",
    date: "2025-07-21",
    notes: [
      "Added Fortune Teller app.",
      "Can predict your weekly fortune",
    ]
  },
  {
    head: "**MSN APP**",
    date: "2025-07-19",
    notes: [
      "Added AI Chat Bot to MSN app.",
      "Chat Bot is able to be switched on/off.",
      "Auto activate Chat Bot when no other users are online.",
    ]
  },
  {
    head: "**New Project**",
    date: "2025-07-10",
    notes: [
      "Added 3D Object in Project folder.",
    ]
  },
  {
    head: "**Clippy**",
    date: "2025-07-03",
    notes: [
      "Added Clippy's new speech.",
    ]
  },
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

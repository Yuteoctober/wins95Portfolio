Windows 95 Portfolio updated 10/03/2024

Live Demo: https://yuteoctober.github.io/wins95Portfolio/

![alt text](https://github.com/Yuteoctober/wins95Portfolio/blob/main/src/assets/markdown.png?raw=true)

React Project:
  - Inspired by actual windows 95 and some other idea from windows 95's portfolios
  - Everything built by me from scratch (No style component!)


Featured Functionality

- Log in
![alt text](https://github.com/Yuteoctober/wins95Portfolio/blob/main/src/assets/login.gif?raw=true)

- Drag and Drop
![alt text](https://github.com/Yuteoctober/wins95Portfolio/blob/main/src/assets/dragDrop.gif?raw=true)

- Change icon size
![alt text](https://github.com/Yuteoctober/wins95Portfolio/blob/main/src/assets/iconSize.gif?raw=true)

- Change background
![alt text](https://github.com/Yuteoctober/wins95Portfolio/blob/main/src/assets/bg.gif?raw=true)

- Run command
![alt text](https://github.com/Yuteoctober/wins95Portfolio/blob/main/src/assets/run.gif?raw=true)

- Live Chat
![alt text](https://github.com/Yuteoctober/wins95Portfolio/blob/main/src/assets/msn.gif?raw=true)

- Notification
![alt text](https://github.com/Yuteoctober/wins95Portfolio/blob/main/src/assets/Noti.gif?raw=true)

- Calendar
![alt text](https://github.com/Yuteoctober/wins95Portfolio/blob/main/src/assets/calendar.gif?raw=true)

- Mine Sweeper
![alt text](https://github.com/Yuteoctober/wins95Portfolio/blob/main/src/assets/game.gif?raw=true)

- Shutting Down
![alt text](https://github.com/Yuteoctober/wins95Portfolio/blob/main/src/assets/shutdown.gif?raw=true)


All the functionalities

  - Drag and Drop
  - Shrink and Expand window
  - Start Menu
  - Resize window
  - Hide and unhide
  - One click to highlight
  - Double Click to open (also works on mobile using usestate to capture the first touch and counting time within 3ms)
  - Introduce Clippy assistant, who always gives you inspiration speeches
  - now Clippy has function to show up and give you advices, when you click on certain thing
  - Added Shutdown Button
    - Shutdown
    - Restart
    - log out

  - Added animation on Shutdown
  - Added Log in page 
    - Added mario animation running
    - Click on ? button can increase mario's size

  - Added MSN
    - Live chat app connected to backend Node, Express and Mongodb    (free server is slow sometimes)
    - Chat is live and has expiration key each session to prevent spam
    - Added filter words
    - Added auto delete for spams on the server side

  - Added MineSweeper
    - flag can now be placed on desktop

  - Added Settings
    - Wallpaper can now be changed
    - Theme will also be changed along with wallpapaer

  - Added Run command 
    - Created Run command windows 10/04/2024
    - Now Run command is fully functioned
    - Added Error handling when type in the wrong file name

  - Added new drag and drop feature
    - now every icon can be drag and drop to any folder
    - fixed bug where dragging out of fold cause other icon to flow in different direction by adding key to its container to rearrange(re-mount) the container
    - icons will now be saved in user localstroage

  - Added notification when page loaded
    - display message and running animation

  - Added MSN notification
    - Notification will pops up when there is a new message when MSN is hidden or closed

  - Now MSN live chat is using websocket instead of API for better performance
    - Added Reconnecting websocket, reconnect chat after user nevigate away and come back

  - Added Icon size adjustable on the icon next to the clock on footer

  - Added Calender by clicking the time on the footer

Library used:
  - React Draggable => drag and drop functionality
  - Framer-motion => for some animation
  - Webamp => Winamp music player (for music app)
  - npm i react-calendar => for calender

All the windows 95 icons and others can be found here
special thanks to whoever own this web
site: https://oldwindowsicons.tumblr.com/tagged/windows%2095


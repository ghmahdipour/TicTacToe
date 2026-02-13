# TicTacToe — Real‑Time Multiplayer & Local Game  
A production‑grade React Native application showcasing scalable architecture, real‑time networking, and polished UI/UX.

## 📌 Overview
TicTacToe is a mobile game built with **React Native**, designed with a modular, maintainable architecture and a strong focus on user experience.  
It includes both **local gameplay** and **real‑time online multiplayer**, powered by WebSockets and managed through Redux Toolkit + Redux‑Saga.

## 📸 Screenshots

### Offline & Online Gameplay with Firebase

<table>
  <tr>
    <td><img src="/assets/Home.png" alt="Home" width="200"/></td>
    <td><img src="/assets/Level.png" alt="Level" width="200"/></td>
    <td><img src="/assets/Easy.png" alt="Easy" width="200"/></td>
    <td><img src="/assets/Medium.png" alt="Medium" width="200"/></td>
  </tr>
  <tr>
    <td><img src="/assets/Hard.png" alt="Hard" width="200"/></td>
    <td><img src="/assets/Online.png" alt="Online Creator" width="200"/></td>
    <td><img src="/assets/Join.jpeg" alt="Join" width="200"/></td>
    <td><img src="/assets/Joined.Join.jpeg" alt="Joined" width="200"/></td>
  </tr>
</table>

---

## 🕹️ How to Play

- Two players can play locally on the same device.  
- Or connect online to challenge friends in real-time.  
- The game automatically tracks scores and winners.
- Dynamic board sizes (3×3, 4×4, 5×5)
    
---

## ✨ Features
- Real‑time multiplayer powered by Firestore listeners  
- Local two‑player mode with instant board updates  
- Scalable architecture with clear module boundaries  
- Redux Toolkit for predictable state management  
- Redux‑Saga for async orchestration and multiplayer lifecycle  
- Smooth animations (Lottie, Animatable, Reanimated)  
- SVG‑based board rendering  
- Sound effects for moves, wins, and draws  
- Responsive UI across all screen sizes  

---

### 🖥 UI/UX
- Animated glassmorphism winner modal
- Smooth transitions (zoom‑in, fade‑in, bounce)
- Responsive layout for all screen sizes
- Custom SVG components (circle indicators, icons)

---

### 🔊 Audio System
- Preloaded SFX (move, win, draw, button)
- Background music with lifecycle control
- Centralized AudioManager for consistent playback

---

### 🌐 Networking
- **Real-time multiplayer** using Firebase Realtime Database / Firestore  
- Automatic cleanup when leaving a game or component unmounts  
- **Room validation**: shows error if the room does not exist  
- Detects when your opponent disconnects  
- **Debounced error messages**: prevents duplicate error pop-ups
  
---

### 🎯 Key Principles
- **Single Responsibility Principle**  
- **Pure reducers** (no side‑effects)  
- **UI/Logic separation**  
- **Predictable async flows**  
- **Reusable components**  
- **Performance‑first mindset**  

---

## 📥 Download TicTacToe APK

Scan the QR code below to download the latest version of the game:

![TicTacToe QR Code](/assets/qrcode.png)





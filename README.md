# TicTacToe — Real‑Time Multiplayer & Local Game  
A production‑grade React Native application showcasing scalable architecture, real‑time networking, and polished UI/UX.

## 📌 Overview
TicTacToe is a mobile game built with **React Native**, designed with a modular, maintainable architecture and a strong focus on user experience.  
It includes both **local gameplay** and **real‑time online multiplayer**, powered by WebSockets and managed through Redux Toolkit + Redux‑Saga.

## 📸 Screenshots

### Offline & Online Gameplay with Firebase

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/0e5dc743-c160-4147-bb11-79be6c062434" alt="Home" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/9cb20a11-697b-46d9-a3bb-53bf8db0d6e9" alt="Level" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/71729497-6fe2-49da-a59b-bd50e7b001bb" alt="Easy" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/6c9233b7-4e7d-450f-891e-81707840d000" alt="Medium" width="200"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/1f33bb15-b9d7-4281-a863-423b497c1543" alt="Hard" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/9bdce3c5-65a1-4354-b2b1-a32388769eed" alt="Online Creator" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/422de48d-12a3-442c-a342-2da5c063b37c" alt="Join" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/44ecf2d5-108a-41a6-b7ed-8a888c64e447" alt="Joined" width="200"/></td>
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

![TicTacToe QR Code](/android/app/src/main/assets/qrcode.png)





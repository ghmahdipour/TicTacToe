# TicTacToe — Real‑Time Multiplayer & Local Game  
A production‑grade React Native application showcasing scalable architecture, real‑time networking, and polished UI/UX.

## 📌 Overview
TicTacToe is a mobile game built with **React Native**, designed with a modular, maintainable architecture and a strong focus on user experience.  
It includes both **local gameplay** and **real‑time online multiplayer**, powered by WebSockets and managed through Redux Toolkit + Redux‑Saga.

This project demonstrates senior‑level engineering practices such as:

- Clean separation of UI, logic, and side‑effects  
- Predictable state management with Redux Toolkit  
- Scalable async flows using Redux‑Saga 
- Pure reducers and testable logic  
- Smooth animations and polished interactions  
- Optimized audio system with preloading and lifecycle control  

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

### 🎮 Gameplay
- Local mode (Self vs Self)
- Online multiplayer with room creation & joining
- Dynamic board sizes (3×3, 5×5, 7×7…)
- Custom win‑length logic
- Real‑time synchronization between players
- Smart turn‑indicator logic (winner‑aware)

### 🖥 UI/UX
- Animated glassmorphism winner modal
- Smooth transitions (zoom‑in, fade‑in, bounce)
- Responsive layout for all screen sizes
- Custom SVG components (circle indicators, icons)

### 🔊 Audio System
- Preloaded SFX (move, win, draw, button)
- Background music with lifecycle control
- Centralized AudioManager for consistent playback

### 🌐 Networking
- WebSocket‑based real‑time communication
- Automatic cleanup on unmount
- Room validation (Room not found)
- Opponent disconnect detection
- Debounced error toasts (no duplicate modals)

---

### Key Principles
- **Single Responsibility Principle**  
- **Pure reducers** (no side‑effects)  
- **UI/Logic separation**  
- **Predictable async flows**  
- **Reusable components**  
- **Performance‑first mindset**  

---

## 🔄 Online Game Flow

```mermaid
flowchart TD
    A[Create/Join Room] --> B[listenBoard Saga]
    B --> C[Server Sync]
    C --> D[Redux Store]
    D --> E[useOnlineGame Hook]
    E --> F[BoardScreen UI]
    F --> G[User Move]
    G --> H[makeMoveRequest Saga]
    H --> C
---

## 🧱 Architecture Diagram

```mermaid
flowchart LR
    UI[UI Components] --> Hooks
    Hooks --> Store
    Store --> Sagas
    Sagas --> WebSocket
    WebSocket --> Store
    Store --> UI
---

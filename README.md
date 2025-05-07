# 📱 dbTools

**dbTools** is a multifunctional mobile utility app designed to measure, analyze, and manage sound environments. It offers tools for decibel measurement, sound analysis, emergency alerts, and device maintenance.

---

## 📋 Table of Contents

* [Features](#features)
* [Development Status](#development-status)
* [Installation](#installation)
* [Usage](#usage)
* [Development](#development)
* [Testing](#testing)
* [Contributing](#contributing)
* [License](#license)

---

## ✨ Features

### 🎚️ Sound Measurement & Analysis

* **Real-Time Decibel Meter**: Monitor ambient noise levels with peak, average, and RMS readings.
* **Sound Level Logger**: Record and export decibel readings over time in CSV or graphical formats.
* **Frequency Spectrum Analyzer**: Visualize sound frequencies in real-time using FFT or bar displays.
* **Calibration Tool**: Adjust microphone input gain based on reference levels.

### 🚨 Safety & Emergency Tools

* **SOS Sound Emitter**: Emit loud whistles or alarms with adjustable pitches, including screen and flashlight synchronization.
* **Silent Area Detector**: Receive warnings when noise levels exceed predefined quiet zones.

### 🧰 Utility Tools

* **Vibration Monitor**: Detect device vibrations using the accelerometer and log tremors or impacts.
* **Threshold Alerts**: Set notifications for when noise exceeds specified decibel levels, useful for various environments.
* **Noise Comparison Tool**: Compare current environment noise with preset standards like libraries or factories.

### 🌊 Water & Device Maintenance

* **Water Cleaner Sound**: Play high-quality, looped water sounds (e.g., streams, rain) to mask background noise or aid relaxation.
* **Speaker & Port Cleaner**: Use low-frequency sound pulses to dislodge dust or water from microphones, speakers, and charging ports.

### 🔧 Additional Features

* **Sound Signature Recorder**: Record short clips and analyze sound profiles.
* **Voice Peak Monitor**: Monitor speaking volume to ensure clarity.
* **Widget & Watch App**: Access mini decibel meters on home screens or smartwatches.
* **Offline Mode**: Utilize all tools without an internet connection.
* **Customizable UI Themes**: Switch between light/dark modes and customize waveform colors.

---

## 🚧 Development Status

### Current Implementation
- Basic project structure with React Native and TypeScript
- Decibel meter component with accelerometer-based simulation
- Testing setup with Jest and React Native Testing Library
- Basic navigation structure

### Planned Improvements
1. **Audio Processing**
   - Implement actual microphone-based decibel measurement
   - Add FFT analysis for frequency spectrum
   - Implement proper audio calibration

2. **UI/UX Enhancements**
   - Add dark mode support
   - Implement responsive layouts
   - Add animations for better user feedback

3. **Core Features**
   - Implement sound logging functionality
   - Add emergency tools (SOS emitter)
   - Develop water sound player
   - Add device maintenance features

4. **Testing & Quality**
   - Add end-to-end testing
   - Implement performance monitoring
   - Add accessibility features

---

## 📲 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/makalin/dbTools.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd dbTools
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **iOS Setup** (iOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

5. **Start the development server**:
   ```bash
   npm start
   ```

6. **Run the application**:
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   ```

---

## 🚀 Usage

* **Decibel Meter**: Open the app to start real-time noise monitoring.
* **Sound Logger**: Navigate to the logging section to record and export data.
* **Emergency Tools**: Access the SOS and Silent Area Detector from the safety menu.
* **Utility Tools**: Use the vibration monitor and threshold alerts as needed.
* **Water & Device Maintenance**: Play water sounds or initiate the speaker/port cleaning feature from the maintenance tab.

---

## 💻 Development

### Project Structure
```
dbTools/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # Screen components
│   └── utils/          # Utility functions
├── __tests__/         # Test files
├── App.tsx            # Root component
└── package.json       # Dependencies and scripts
```

### Available Scripts
- `npm start`: Start the Metro bundler
- `npm run ios`: Run on iOS simulator
- `npm run android`: Run on Android emulator
- `npm test`: Run tests
- `npm run lint`: Run ESLint

---

## 🧪 Testing

The project uses Jest and React Native Testing Library for testing. Run tests with:

```bash
npm test
```

Current test coverage includes:
- Component rendering
- Basic functionality
- User interactions

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a new branch**:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add YourFeature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/YourFeature
   ```
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

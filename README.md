# The A.I Bus Driver — "An Introvert's New Hope"

This project simulates an AI-powered bus system for Malaysia that emphasizes **reliability**, **hospitality**, and **realistic transit behavior**.

Unlike traditional bus apps, this simulation models public buses as **polite, responsive, and punctual companions**, delivering a better experience by mimicking the high-touch service found in five-star hotels.

> ⚠️ This is an **ongoing project** and part of a passion initiative. It serves as a sandbox for public transport simulation and creative exploration using free APIs and open tools.

---

## Features Implemented (MVP)

### Realistic Road-Based Bus Movement
- Buses follow **actual road paths** using [OpenRouteService](https://openrouteservice.org/) routes
- Smooth animation between bus stops with precise location interpolation
- Avoids cutting through buildings or unrealistic routes

### Bus Timing Logic
- Buses travel for **2.5 minutes** between stops
- Each stop has a **3-minute wait time**
- Continuous loop through all stops (circuit route)

### Visual Display
- Built with **React** and **Leaflet.js**
- Map shows:
  - 🚏 Bus stops (with names)
  - 🛣️ Route lines for both directions
  - 🚌 Animated buses using custom icons
  - ETA countdowns and stop labels

### Informative Control Panel
- Displays:
  - Bus ID and direction
  - Current segment (e.g. `One Utama → SMK BU 2`)
  - ETA to next stop
  - Current stop name

---

## Technologies Used

| Tech                | Purpose                                  |
|---------------------|-------------------------------------------|
| **React.js**        | Core front-end framework                 |
| **Leaflet.js**      | Interactive map rendering                |
| **OpenRouteService**| Road network routing between coordinates |
| **JavaScript**      | State management and timing logic        |
| **GeoJSON / Polyline** | Precise movement interpolation        |

---

## Project Structure Overview
├── public/
│ └── Bus.png # Custom bus icon
├── src/
│ ├── data/
│ │ ├── stops.js # All bus stops with coordinates
│ │ └── paths.js # ORS-generated road paths
│ ├── components/
│ │ └── MapView.js # Handles map rendering & bus movement
│ ├── App.js # Main app logic and state
│ └── App.css # Styling
├── README.md

## Setup Instructions
```
# Clone this repository
git clone https://github.com/yourusername/ai-bus-driver.git
cd ai-bus-driver

# Install dependencies
npm install

# Start the development server
npm start
```

## Requirements
1. Node.js
2. NPM
3. OpenRouteService API key (only needed if regenerating routes)

## How Bus Movement Works
Each bus:

- Moves along a road segment (segmentIndex)
- progress is updated every second based on elapsed time
- Once it reaches the end of a segment, it stops at the next station for 3 minutes
- Then continues to the next segment (loops at end)

## Future Plans
Passenger simulation (boarding / alighting)

1. AI-based decision-making (avoid bus bunching, dynamic routing)
2. Real-time schedule board
3. Weather and traffic impact simulation
4. Deploy live with a backend

## Disclaimer
This project is intended for educational and personal development. It's not affiliated with any public transport authority in Malaysia. No harm or offense is intended — it's a creative, exploratory attempt to simulate a better, more humane bus experience.

## Contact
Built by @IntrovertBocchi
For questions or collaboration, feel free to open an issue or pull request.

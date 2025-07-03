import stops from './data/stops';
import MapView from './components/MapView';
import './App.css';
import { useState, useEffect } from 'react';

function formatETA(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function App() {
  const [buses, setBuses] = useState([
  {
    id: 'Bus 1',
    currentStop: 0,
    nextStop: 1,
    direction: 'forward',
    waitTime: 300,
    eta: '5:00',
    isWaiting: false,
    progress: 0,
  },
  {
    id: 'Bus 2',
    currentStop: 1,
    nextStop: 2,
    direction: 'forward',
    waitTime: 300,
    eta: '5:00',
    isWaiting: false,
    progress: 0,
  },
]);


  useEffect(() => {
  const timer = setInterval(() => {
    setBuses(prevBuses =>
      prevBuses.map(bus => {
        if (bus.isWaiting) {
          // countdown until next move
          if (bus.waitTime > 0) {
            const newTime = bus.waitTime - 1;
            return {
              ...bus,
              waitTime: newTime,
              eta: formatETA(newTime),
            };
          } else {
            // Done waiting, begin moving
            return {
              ...bus,
              isWaiting: false,
              progress: 0,
              eta: 'Moving...',
            };
          }
        } else {
          // Animate movement (progress from 0 to 1 over 300s)
          const newProgress = bus.progress + 1 / 300;
          if (newProgress >= 1) {
            const nextIndex = stops.findIndex(s => s.id === bus.nextStop);
            const afterNextStop = stops[nextIndex + 1] || stops[0];

            return {
              ...bus,
              currentStop: bus.nextStop,
              nextStop: afterNextStop.id,
              direction: afterNextStop.direction,
              isWaiting: true,
              waitTime: 300,
              eta: '5:00',
              progress: 0,
            };
          }

          return {
            ...bus,
            progress: newProgress,
          };
        }
      })
    );
  }, 1000);

  return () => clearInterval(timer);
}, []);


  function departBus(busId) {
    if (!window.confirm('Are you sure you want this bus to depart?')) return;

    setBuses(prevBuses =>
      prevBuses.map(bus => {
        if (bus.id !== busId) return bus;

        const currentIndex = stops.findIndex(s => s.id === bus.currentStop);
        const nextIndex = currentIndex + 1;

        if (nextIndex >= stops.length) {
          return {
            ...bus,
            currentStop: 0,
            direction: 'forward',
            waitTime: 300,
            eta: '5:00',
            isWaiting: true,
          };
        }

        const nextStop = stops[nextIndex];

        return {
          ...bus,
          currentStop: nextStop.id,
          direction: nextStop.direction,
          waitTime: 300,
          eta: '5:00',
          isWaiting: true,
        };
      })
    );
  }

  return (
    <div className="App">
      <h1>AI Bus Driver MVP</h1>
      <MapView buses={buses} />

      <h2>Bus Control Panel</h2>
      {buses.map(bus => {
        const stop = stops.find(s => s.id === bus.currentStop);
        return (
          <div key={bus.id} style={{ marginBottom: '1rem' }}>
            <strong>{bus.id}</strong> — <em>{bus.direction}</em>
            <br />
            Current Stop: {stop?.name || 'Unknown'}
            <br />
            ETA: {bus.eta}
            <br />
            <button onClick={() => departBus(bus.id)}>Depart</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;

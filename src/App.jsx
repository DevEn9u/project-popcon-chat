import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import ChatMessage from './components/ChatMessage';
import ChatStart from './components/ChatStart';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" index element={<ChatStart />} />
          <Route path="/chat" element={<ChatMessage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

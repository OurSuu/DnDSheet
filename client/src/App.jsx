import React, { useState } from 'react';
import StrixhavenSheet from './StrixhavenSheet';
import Sidebar from './components/Sidebar';

function App() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar selectedMember={selectedMember} onSelectMember={setSelectedMember} />
      <div className="main-content" style={{ flexGrow: 1, overflow: 'auto', position: 'relative', WebkitOverflowScrolling: 'touch' }}>
        <StrixhavenSheet selectedMember={selectedMember} />
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './Sidebar.css';

function Sidebar({ selectedMember, onSelectMember }) {
  const [parties, setParties] = useState([]);
  const [members, setMembers] = useState([]);
  const [newPartyName, setNewPartyName] = useState('');
  const [addingMemberTo, setAddingMemberTo] = useState(null);
  const [newMemberName, setNewMemberName] = useState('');
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [editMemberName, setEditMemberName] = useState('');
  const [expandedParties, setExpandedParties] = useState({});
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      if (data.success) {
        setParties(data.parties);
        setMembers(data.members);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleCreateParty = async (e) => {
    e.preventDefault();
    if (!newPartyName.trim()) return;
    try {
      const res = await fetch('/api/party/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newPartyName })
      });
      const data = await res.json();
      if (data.success) {
        setParties([...parties, data.party]);
        setNewPartyName('');
        setExpandedParties({ ...expandedParties, [data.party.id]: true });
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteParty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this party and all its members?')) return;
    try {
      const res = await fetch('/api/party/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setParties(parties.filter(p => p.id !== id));
        setMembers(members.filter(m => m.party_id !== id));
        if (selectedMember && members.find(m => m.id === selectedMember.id && m.party_id === id)) {
           onSelectMember(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateMember = async (e, partyId) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    try {
      const res = await fetch('/api/member/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newMemberName, party_id: partyId })
      });
      const data = await res.json();
      if (data.success) {
        setMembers([...members, data.member]);
        setAddingMemberTo(null);
        setNewMemberName('');
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      const res = await fetch('/api/member/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setMembers(members.filter(m => m.id !== id));
        if (selectedMember && selectedMember.id === id) onSelectMember(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateMember = async (e, id) => {
    e.preventDefault();
    if (!editMemberName.trim()) return;
    try {
      const res = await fetch('/api/member/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: editMemberName })
      });
      const data = await res.json();
      if (data.success) {
        setMembers(members.map(m => m.id === id ? data.member : m));
        setEditingMemberId(null);
        if (selectedMember && selectedMember.id === id) {
          onSelectMember(data.member);
        }
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleParty = (partyId) => {
    setExpandedParties(prev => ({ ...prev, [partyId]: !prev[partyId] }));
  };

  return (
    <>
      {!isOpen && (
        <button className="sidebar-toggle-btn" onClick={() => setIsOpen(true)} title="Open Grimoire">
          ☰
        </button>
      )}
      <div className={`sidebar-container ${!isOpen ? 'closed' : ''}`}>
        <div className="sidebar-header">
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <h2>Grimoire</h2>
             <button type="button" className="close-sidebar-btn" onClick={() => setIsOpen(false)} title="Close Grimoire">✖</button>
           </div>
        </div>

        <div className="sidebar-content">
        <form onSubmit={handleCreateParty} className="add-party-form">
          <input
            type="text"
            placeholder="New Party Name"
            value={newPartyName}
            onChange={(e) => setNewPartyName(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        <div className="party-list">
          {parties.map(party => (
            <div key={party.id} className="party-item">
              <div className="party-header">
                <button className="expand-btn" onClick={() => toggleParty(party.id)}>
                  {expandedParties[party.id] ? '▼' : '▶'}
                </button>
                <span className="party-name" onClick={() => toggleParty(party.id)}>{party.name}</span>
                <button className="delete-btn" onClick={() => handleDeleteParty(party.id)} title="Delete Party">✖</button>
              </div>

              {expandedParties[party.id] && (
                <div className="member-list">
                  {members.filter(m => m.party_id === party.id).map(member => (
                    <div
                      key={member.id}
                      className={`member-item ${selectedMember?.id === member.id ? 'selected' : ''}`}
                    >
                      {editingMemberId === member.id ? (
                        <form onSubmit={(e) => handleUpdateMember(e, member.id)} className="edit-member-form">
                          <input
                            type="text"
                            value={editMemberName}
                            onChange={(e) => setEditMemberName(e.target.value)}
                            autoFocus
                          />
                          <button type="submit" className="save-btn">✔</button>
                          <button type="button" className="cancel-btn" onClick={() => setEditingMemberId(null)}>✖</button>
                        </form>
                      ) : (
                        <div className="member-display" onClick={() => onSelectMember(member)}>
                          <span className="member-name">{member.name}</span>
                          <div className="member-actions" onClick={e => e.stopPropagation()}>
                            <button className="edit-btn" onClick={() => {
                              setEditingMemberId(member.id);
                              setEditMemberName(member.name);
                            }}>✎</button>
                            <button className="delete-btn" onClick={() => handleDeleteMember(member.id)}>✖</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {addingMemberTo === party.id ? (
                    <form onSubmit={(e) => handleCreateMember(e, party.id)} className="add-member-form">
                      <input
                        type="text"
                        placeholder="New Member Name"
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                        autoFocus
                      />
                      <button type="submit" className="save-btn">✔</button>
                      <button type="button" className="cancel-btn" onClick={() => setAddingMemberTo(null)}>✖</button>
                    </form>
                  ) : (
                    <button className="add-member-btn" onClick={() => {
                      setAddingMemberTo(party.id);
                      setNewMemberName('');
                    }}>
                      + Add Member
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default Sidebar;

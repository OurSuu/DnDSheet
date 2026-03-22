import React, { useState } from 'react';
import RowInput from './components/RowInput';
import CheckboxInput from './components/CheckboxInput';
import './StrixhavenSheet.css';

const INITIAL_STATE = {
  name: "",
  party: "",
  relationships: Array(5).fill({ name: "", points: 0, relationship: "", inspiration: false, boonBane: "" }),
  reportCards: {
    year1: Array(3).fill({ checks: [false, false, false, false], skills: "" }),
    year2: Array(3).fill({ checks: [false, false, false, false], skills: "" }),
    year3: Array(3).fill({ checks: [false, false, false, false], skills: "" }),
    year4: Array(1).fill({ checks: [false, false, false, false], skills: "" }),
  },
  extracurriculars: [
    { name: "", d4: false, skills: "", member: false },
    { name: "", d4: false, skills: "", member: false }
  ],
  job: { employer: "", job: "", coworker: "" }
};

// ==========================
// REUSABLE ROW COMPONENTS
// ==========================

const RelationshipRow = ({ rel, index, updateData }) => (
  <div className={`abs-row rel-row-${index}`}>
    <div className="abs-col col-rel-name"><RowInput value={rel.name} onChange={e => updateData('relationships', index, 'name', e.target.value)} /></div>
    <div className="abs-col col-rel-points"><RowInput type="number" value={rel.points} onChange={e => updateData('relationships', index, 'points', Number(e.target.value))} /></div>
    <div className="abs-col col-rel-desc"><RowInput value={rel.relationship} onChange={e => updateData('relationships', index, 'relationship', e.target.value)} /></div>
    <div className="abs-col col-rel-insp checkbox-wrap"><CheckboxInput checked={rel.inspiration} onChange={e => updateData('relationships', index, 'inspiration', e.target.checked)} /></div>
    <div className="abs-col col-rel-boon"><RowInput value={rel.boonBane} onChange={e => updateData('relationships', index, 'boonBane', e.target.value)} /></div>
  </div>
);

const ReportRow = ({ row, index, stateKey, cssKey, isRightSide, updateYear }) => {
  const prefix = isRightSide ? 'right' : 'left';
  return (
    <div className={`abs-row rc-row-${cssKey}-${index}`}>
      <div className={`abs-col col-rc-${prefix}-c1 checkbox-wrap`}><CheckboxInput checked={row.checks[0]} onChange={e => updateYear(stateKey, index, 'checks', 0, e.target.checked)} /></div>
      <div className={`abs-col col-rc-${prefix}-c2 checkbox-wrap`}><CheckboxInput checked={row.checks[1]} onChange={e => updateYear(stateKey, index, 'checks', 1, e.target.checked)} /></div>
      <div className={`abs-col col-rc-${prefix}-c3 checkbox-wrap`}><CheckboxInput checked={row.checks[2]} onChange={e => updateYear(stateKey, index, 'checks', 2, e.target.checked)} /></div>
      <div className={`abs-col col-rc-${prefix}-c4 checkbox-wrap`}><CheckboxInput checked={row.checks[3]} onChange={e => updateYear(stateKey, index, 'checks', 3, e.target.checked)} /></div>
      <div className={`abs-col col-rc-${prefix}-skills`}><RowInput value={row.skills} onChange={e => updateYear(stateKey, index, 'skills', null, e.target.value)} /></div>
    </div>
  );
};

const ExtraRow = ({ ec, index, updateData }) => (
  <div className={`abs-row ec-row-${index}`}>
    <div className="abs-col col-ec-name"><RowInput value={ec.name} onChange={e => updateData('extracurriculars', index, 'name', e.target.value)} /></div>
    <div className="abs-col col-ec-d4"><RowInput type="number" value={ec.d4} onChange={e => updateData('extracurriculars', index, 'd4', Number(e.target.value))} /></div>
    <div className="abs-col col-ec-skills"><RowInput value={ec.skills} onChange={e => updateData('extracurriculars', index, 'skills', e.target.value)} /></div>
    <div className="abs-col col-ec-member checkbox-wrap"><CheckboxInput checked={ec.member} onChange={e => updateData('extracurriculars', index, 'member', e.target.checked)} /></div>
  </div>
);

function StrixhavenSheet({ selectedMember }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [statusMsg, setStatusMsg] = useState('');
  const [showGrid, setShowGrid] = useState(false);
  const lastSavedData = React.useRef(null);
  const currentMemberRef = React.useRef(selectedMember);
  const formDataRef = React.useRef(formData);

  React.useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  React.useEffect(() => {
    // If switching away from a member, do a synchronous save of any pending changes
    if (currentMemberRef.current && selectedMember && currentMemberRef.current.id !== selectedMember.id) {
       const oldDataStr = JSON.stringify(formDataRef.current);
       if (lastSavedData.current && oldDataStr !== lastSavedData.current) {
          console.log("Instantly saving unsaved changes for", currentMemberRef.current.name);
          fetch('/api/save', {
             method: 'POST', 
             headers: { 'Content-Type': 'application/json' },
             keepalive: true,
             body: JSON.stringify({ member_id: currentMemberRef.current.id, data: formDataRef.current })
          }).catch(e => console.error("Error auto-saving on switch", e));
       }
    }
    
    currentMemberRef.current = selectedMember;
    
    // Invalidate tracking immediately when member changes to prevent cross-saving old data
    lastSavedData.current = null;
    
    if (selectedMember) {
      handleLoad(selectedMember.id);
    } else {
      setFormData(INITIAL_STATE);
    }
  }, [selectedMember]);

  React.useEffect(() => {
    if (!selectedMember) return;
    
    // Auto-save logic: Check if formData actually changed from what we consider "saved"
    const currentDataStr = JSON.stringify(formData);
    if (lastSavedData.current && currentDataStr !== lastSavedData.current) {
      setStatusMsg("Unsaved changes...");
      const timer = setTimeout(() => {
        handleSave(formData);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [formData, selectedMember]);

  // Form State Handlers
  const updateData = (section, index, field, value) => {
    setFormData(prev => {
      if (Array.isArray(prev[section])) {
        const newArr = [...prev[section]];
        newArr[index] = { ...newArr[index], [field]: value };
        return { ...prev, [section]: newArr };
      }
      return { ...prev, [section]: { ...prev[section], [field]: value } };
    });
  };

  const updateYear = (year, index, field, subIndex, value) => {
    setFormData(prev => {
      const newYear = [...prev.reportCards[year]];
      if (field === 'checks') {
        const newChecks = [...newYear[index].checks];
        newChecks[subIndex] = value;
        newYear[index] = { ...newYear[index], checks: newChecks };
      } else {
        newYear[index] = { ...newYear[index], [field]: value };
      }
      return { ...prev, reportCards: { ...prev.reportCards, [year]: newYear } };
    });
  };

  const updateTopLevel = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (dataToSave) => {
    if (!selectedMember) return;
    try {
      setStatusMsg("AutoSaving...");
      const res = await fetch('/api/save', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ member_id: selectedMember.id, data: dataToSave })
      });
      const result = await res.json();
      
      if (result.success) {
        lastSavedData.current = JSON.stringify(dataToSave);
        setStatusMsg("Saved ✅");
      } else {
        setStatusMsg("Error Saving ❌");
        console.error("Save error:", result.error);
      }
    } catch (err) {
      setStatusMsg("Error Saving ❌");
      console.error(err);
    }
  };

  const handleLoad = async (member_id) => {
    try {
      setStatusMsg("Loading...");
      const res = await fetch('/api/load', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ member_id })
      });
      const result = await res.json();
      if (result.success) { 
        if (result.data) {
          setFormData(result.data); 
          lastSavedData.current = JSON.stringify(result.data);
          setStatusMsg("Loaded ✅"); 
        } else {
          setFormData(INITIAL_STATE);
          lastSavedData.current = JSON.stringify(INITIAL_STATE);
          setStatusMsg("New Sheet ✅");
        }
      } else {
        setStatusMsg("Error Loading ❌");
      }
    } catch (err) { 
      setStatusMsg("Error Loading ❌"); 
    }
  };

  return (
    <div className="app-layout">
      {/* Top Banner Controls */}
      <div className="top-banner-controls">
        <div style={{ marginRight: '20px', fontWeight: 'bold' }}>
          {selectedMember ? `Selected: ${selectedMember.name}` : 'No Member Selected'}
        </div>
          
        <button className="primary-btn debug-btn" onClick={() => setShowGrid(!showGrid)}>Toggle Grid</button>
        {statusMsg && <div className="status-message">{statusMsg}</div>}
      </div>

      <div className="sheet-container">
        <img src="/Strixhaven.jpg" className="sheet-bg" alt="Background" />
        {showGrid && <div className="grid-debug"></div>}

                                                                {/* AUTO-GENERATED STRICT INPUTS */}
        <div className="frame-1" data-layer="Frame 1"></div>
        <input type="checkbox" className="checkbox inspirationcheckbox-0" data-layer="InspirationCheckBox" checked={formData.relationships[0].inspiration} onChange={e => updateData("relationships", 0, "inspiration", e.target.checked)} />
        <input type="checkbox" className="checkbox inspirationcheckbox-1" data-layer="InspirationCheckBox" checked={formData.relationships[1].inspiration} onChange={e => updateData("relationships", 1, "inspiration", e.target.checked)} />
        <input type="checkbox" className="checkbox inspirationcheckbox-2" data-layer="InspirationCheckBox" checked={formData.relationships[2].inspiration} onChange={e => updateData("relationships", 2, "inspiration", e.target.checked)} />
        <input type="checkbox" className="checkbox inspirationcheckbox-3" data-layer="InspirationCheckBox" checked={formData.relationships[3].inspiration} onChange={e => updateData("relationships", 3, "inspiration", e.target.checked)} />
        <input type="checkbox" className="checkbox inspirationcheckbox-4" data-layer="InspirationCheckBox" checked={formData.relationships[4].inspiration} onChange={e => updateData("relationships", 4, "inspiration", e.target.checked)} />
        <input type="checkbox" className="checkbox extracurriculars-checkbox" data-layer="Extracurriculars_CheckBox" checked={formData.extracurriculars[0].d4} onChange={e => updateData("extracurriculars", 0, "d4", e.target.checked)} />
        <input type="checkbox" className="checkbox extracurriculars2-checkbox" data-layer="Extracurriculars2_CheckBox" checked={formData.extracurriculars[1].d4} onChange={e => updateData("extracurriculars", 1, "d4", e.target.checked)} />
        <input type="checkbox" className="checkbox year1checkbox" data-layer="Year1CheckBox" />
        <input type="checkbox" className="checkbox year1-2-2checkbox" data-layer="Year1_2_2CheckBox" />
        <input type="checkbox" className="checkbox year1-2-3checkbox" data-layer="Year1_2_3CheckBox" />
        <input type="checkbox" className="checkbox year1-2-4checkbox" data-layer="Year1_2_4CheckBox" />
        <input type="checkbox" className="checkbox year1-3-4checkbox" data-layer="Year1_3_4CheckBox" />
        <input type="checkbox" className="checkbox year1-3-3checkbox" data-layer="Year1_3_3CheckBox" />
        <input type="checkbox" className="checkbox year1-3-2checkbox" data-layer="Year1_3_2CheckBox" />
        <input type="checkbox" className="checkbox year1-3-1checkbox" data-layer="Year1_3_1CheckBox" />
        <input type="checkbox" className="checkbox year3checkbox" data-layer="Year3CheckBox" />
        <input type="checkbox" className="checkbox year3-2checkbox" data-layer="Year3_2CheckBox" />
        <input type="checkbox" className="checkbox year3-3checkbox" data-layer="Year3_3CheckBox" />
        <input type="checkbox" className="checkbox year3-4checkbox" data-layer="Year3_4CheckBox" />
        <input type="checkbox" className="checkbox year3-2-1checkbox" data-layer="Year3_2_1CheckBox" />
        <input type="checkbox" className="checkbox year3-2-2checkbox" data-layer="Year3_2_2CheckBox" />
        <input type="checkbox" className="checkbox year3-2-3checkbox" data-layer="Year3_2_3CheckBox" />
        <input type="checkbox" className="checkbox year3-2-4checkbox" data-layer="Year3_2_4CheckBox" />
        <input type="checkbox" className="checkbox year3-2-5checkbox" data-layer="Year3_2_5CheckBox" />
        <input type="checkbox" className="checkbox year3-3-4checkbox" data-layer="Year3_3_4CheckBox" />
        <input type="checkbox" className="checkbox year3-3-3checkbox" data-layer="Year3_3_3CheckBox" />
        <input type="checkbox" className="checkbox year3-3-2checkbox" data-layer="Year3_3_2CheckBox" />
        <input type="checkbox" className="checkbox year3-3-1checkbox" data-layer="Year3_3_1CheckBox" />
        <input type="checkbox" className="checkbox year1-2-1checkbox" data-layer="Year1_2_1CheckBox" />
        <input type="checkbox" className="checkbox year1-1checkbox" data-layer="Year1_1CheckBox" />
        <input type="checkbox" className="checkbox year1-2checkbox" data-layer="Year1_2CheckBox" />
        <input type="checkbox" className="checkbox year1-3checkbox" data-layer="Year1_3CheckBox" />
        <input type="checkbox" className="checkbox year2checkbox" data-layer="Year2CheckBox" />
        <input type="checkbox" className="checkbox year2-2-1checkbox" data-layer="Year2_2_1CheckBox" />
        <input type="checkbox" className="checkbox year2-2-2checkbox" data-layer="Year2_2_2CheckBox" />
        <input type="checkbox" className="checkbox year2-3-2checkbox" data-layer="Year2_3_2CheckBox" />
        <input type="checkbox" className="checkbox year2-3-3checkbox" data-layer="Year2_3_3CheckBox" />
        <input type="checkbox" className="checkbox year2-3-4checkbox" data-layer="Year2_3_4CheckBox" />
        <input type="checkbox" className="checkbox year2-3-5checkbox" data-layer="Year2_3_5CheckBox" />
        <input type="checkbox" className="checkbox year2-2-3checkbox" data-layer="Year2_2_3CheckBox" />
        <input type="checkbox" className="checkbox year2-2-4checkbox" data-layer="Year2_2_4CheckBox" />
        <input type="checkbox" className="checkbox year2-3-1checkbox" data-layer="Year2_3_1CheckBox" />
        <input type="checkbox" className="checkbox year4checkbox" data-layer="Year4CheckBox" />
        <input type="checkbox" className="checkbox year4-2checkbox" data-layer="Year4_2CheckBox" />
        <input type="checkbox" className="checkbox year4-3checkbox" data-layer="Year4_3CheckBox" />
        <input type="checkbox" className="checkbox notime-checkbox" data-layer="NoTime_CheckBox" />
        <input type="checkbox" className="checkbox notime2-checkbox" data-layer="NoTime2_CheckBox" />
        <input type="checkbox" className="checkbox year4-4checkbox" data-layer="Year4_4CheckBox" />
        <input type="checkbox" className="checkbox year2-2checkbox" data-layer="Year2_2CheckBox" />
        <input type="checkbox" className="checkbox year2-3checkbox" data-layer="Year2_3CheckBox" />
        <input type="checkbox" className="checkbox year2-4checkbox" data-layer="Year2_4CheckBox" />
        <input type="text" className="input name-txt" data-layer="Name_Txt" value={formData.relationships[0].name} onChange={e => updateData("relationships", 0, "name", e.target.value)} />
        <input type="number" className="input point-int" data-layer="Point_Int" value={formData.relationships[0].points} onChange={e => updateData("relationships", 0, "points", Number(e.target.value))} />
        <input type="number" className="input point2-int" data-layer="Point2_Int" value={formData.relationships[1].points} onChange={e => updateData("relationships", 1, "points", Number(e.target.value))} />
        <input type="number" className="input point3-int" data-layer="Point3_Int" value={formData.relationships[2].points} onChange={e => updateData("relationships", 2, "points", Number(e.target.value))} />
        <input type="number" className="input point4-int" data-layer="Point4_Int" value={formData.relationships[3].points} onChange={e => updateData("relationships", 3, "points", Number(e.target.value))} />
        <input type="number" className="input point5-int" data-layer="Point5_Int" value={formData.relationships[4].points} onChange={e => updateData("relationships", 4, "points", Number(e.target.value))} />
        <input type="text" className="input relationship-txt" data-layer="Relationship_Txt" value={formData.relationships[0].relationship} onChange={e => updateData("relationships", 0, "relationship", e.target.value)} />
        <input type="text" className="input relationship2-txt" data-layer="Relationship2_Txt" value={formData.relationships[1].relationship} onChange={e => updateData("relationships", 1, "relationship", e.target.value)} />
        <input type="text" className="input relationship3-txt" data-layer="Relationship3_Txt" value={formData.relationships[2].relationship} onChange={e => updateData("relationships", 2, "relationship", e.target.value)} />
        <input type="text" className="input relationship4-txt" data-layer="Relationship4_Txt" value={formData.relationships[3].relationship} onChange={e => updateData("relationships", 3, "relationship", e.target.value)} />
        <input type="text" className="input relationship5-txt" data-layer="Relationship5_Txt" value={formData.relationships[4].relationship} onChange={e => updateData("relationships", 4, "relationship", e.target.value)} />
        <input type="text" className="input bool-bane-txt" data-layer="Bool/Bane_Txt" value={formData.relationships[0].boonBane} onChange={e => updateData("relationships", 0, "boonBane", e.target.value)} />
        <input type="text" className="input bool-bane2-txt" data-layer="Bool/Bane2_Txt" value={formData.relationships[1].boonBane} onChange={e => updateData("relationships", 1, "boonBane", e.target.value)} />
        <input type="text" className="input bool-bane3-txt" data-layer="Bool/Bane3_Txt" value={formData.relationships[2].boonBane} onChange={e => updateData("relationships", 2, "boonBane", e.target.value)} />
        <input type="text" className="input bool-bane4-txt" data-layer="Bool/Bane4_Txt" value={formData.relationships[3].boonBane} onChange={e => updateData("relationships", 3, "boonBane", e.target.value)} />
        <input type="text" className="input bool-bane5-txt" data-layer="Bool/Bane5_Txt" value={formData.relationships[4].boonBane} onChange={e => updateData("relationships", 4, "boonBane", e.target.value)} />
        <input type="text" className="input ex-skills-txt" data-layer="Ex_Skills_Txt" value={formData.extracurriculars[0].skills} onChange={e => updateData("extracurriculars", 0, "skills", e.target.value)} />
        <input type="text" className="input ex-skills2-txt" data-layer="Ex_Skills2_Txt" value={formData.extracurriculars[1].skills} onChange={e => updateData("extracurriculars", 1, "skills", e.target.value)} />
        <input type="text" className="input ex-name-txt" data-layer="Ex_Name_Txt" value={formData.extracurriculars[0].name} onChange={e => updateData("extracurriculars", 0, "name", e.target.value)} />
        <input type="text" className="input employer-txt" data-layer="Employer_Txt" value={formData.job.employer} onChange={e => setFormData({...formData, job: {...formData.job, employer: e.target.value}})} />
        <input type="text" className="input job-txt" data-layer="Job_Txt" value={formData.job.job} onChange={e => setFormData({...formData, job: {...formData.job, job: e.target.value}})} />
        <input type="text" className="input coworker-txt" data-layer="Coworker_Txt" value={formData.job.coworker} onChange={e => setFormData({...formData, job: {...formData.job, coworker: e.target.value}})} />
        <input type="text" className="input ex-name2-txt" data-layer="Ex_Name2_Txt" value={formData.extracurriculars[1].name} onChange={e => updateData("extracurriculars", 1, "name", e.target.value)} />
        <input type="text" className="input ex-member-txt" data-layer="Ex_Member_Txt" checked={formData.extracurriculars[0].member} onChange={e => updateData("extracurriculars", 0, "member", e.target.checked)} />
        <input type="text" className="input ex-member2-txt" data-layer="Ex_Member2_Txt" checked={formData.extracurriculars[1].member} onChange={e => updateData("extracurriculars", 1, "member", e.target.checked)} />
        <input type="text" className="input name2-txt" data-layer="Name2_Txt" value={formData.relationships[1].name} onChange={e => updateData("relationships", 1, "name", e.target.value)} />
        <input type="text" className="input name3-txt" data-layer="Name3_Txt" value={formData.relationships[2].name} onChange={e => updateData("relationships", 2, "name", e.target.value)} />
        <input type="text" className="input name4-txt" data-layer="Name4_Txt" value={formData.relationships[3].name} onChange={e => updateData("relationships", 3, "name", e.target.value)} />
        <input type="text" className="input name5-txt" data-layer="Name5_Txt" value={formData.relationships[4].name} onChange={e => updateData("relationships", 4, "name", e.target.value)} />
      </div>
    </div>
  );
}

export default StrixhavenSheet;

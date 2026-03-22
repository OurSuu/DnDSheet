const fs = require('fs');

const html = `
<div data-layer="Frame 2" className="Frame2" style={{width: 1173, height: 896, position: 'relative'}}>
  <div data-layer="Name2_Txt" className="Name2Txt" style={{width: 225, height: 22, left: 77, top: 233, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Name3_Txt" className="Name3Txt" style={{width: 225, height: 22, left: 77, top: 271, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Name4_Txt" className="Name4Txt" style={{width: 225, height: 22, left: 77, top: 310, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Name5_Txt" className="Name5Txt" style={{width: 225, height: 22, left: 77, top: 348, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Name_Txt" className="NameTxt" style={{width: 225, height: 22, left: 77, top: 195, position: 'absolute', background: '#D9D9D9'}} />
  <div data-svg-wrapper data-layer="Point_int" className="PointInt" style={{left: 349, top: 195, position: 'absolute'}}>
    <svg width="44" height="22" viewBox="0 0 44 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="44" height="22" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Point2_int" className="Point2Int" style={{left: 349, top: 233, position: 'absolute'}}>
    <svg width="44" height="22" viewBox="0 0 44 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="44" height="22" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Point3_int" className="Point3Int" style={{left: 349, top: 271, position: 'absolute'}}>
    <svg width="44" height="22" viewBox="0 0 44 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="44" height="22" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Point4_int" className="Point4Int" style={{left: 349, top: 310, position: 'absolute'}}>
    <svg width="44" height="22" viewBox="0 0 44 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="44" height="22" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Point5_int" className="Point5Int" style={{left: 349, top: 348, position: 'absolute'}}>
    <svg width="44" height="22" viewBox="0 0 44 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="44" height="22" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-layer="Relationship_Txt" className="RelationshipTxt" style={{width: 163, height: 22, left: 474, top: 195, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Bone/Bane_Txt" className="BoneBaneTxt" style={{width: 242, height: 22, left: 822, top: 195, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Bone/Bane2_Txt" className="BoneBane2Txt" style={{width: 242, height: 22, left: 822, top: 233, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Bone/Bane3_Txt" className="BoneBane3Txt" style={{width: 242, height: 22, left: 822, top: 271, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Bone/Bane4_Txt" className="BoneBane4Txt" style={{width: 242, height: 22, left: 822, top: 310, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Bone/Bane5_Txt" className="BoneBane5Txt" style={{width: 242, height: 22, left: 822, top: 348, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Relationship2_Txt" className="Relationship2Txt" style={{width: 163, height: 22, left: 474, top: 233, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Relationship3_Txt" className="Relationship3Txt" style={{width: 163, height: 22, left: 474, top: 271, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Relationship4_Txt" className="Relationship4Txt" style={{width: 163, height: 22, left: 474, top: 310, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Relationship5_Txt" className="Relationship5Txt" style={{width: 163, height: 22, left: 474, top: 348, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Year1_Skills_Txt" className="Year1SkillsTxt" style={{width: 112, height: 22, left: 231, top: 525, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Year2_Skills_Txt" className="Year2SkillsTxt" style={{width: 112, height: 22, left: 566, top: 525, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Extra_Name_Txt" className="ExtraNameTxt" style={{width: 112, height: 22, left: 730, top: 525, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Extra_Name2_Txt" className="ExtraName2Txt" style={{width: 112, height: 22, left: 730, top: 571, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Job_Employer_Txt" className="JobEmployerTxt" style={{width: 112, height: 22, left: 730, top: 753, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Job_Employer2_Txt" className="JobEmployer2Txt" style={{width: 112, height: 22, left: 869, top: 753, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Job_Employer3_Txt" className="JobEmployer3Txt" style={{width: 112, height: 22, left: 1008, top: 753, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Job_Txt" className="JobTxt" style={{width: 149, height: 22, left: 730, top: 817, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Coworker_Txt" className="CoworkerTxt" style={{width: 158, height: 22, left: 925, top: 817, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Extra_Skill_Txt" className="ExtraSkillTxt" style={{width: 78, height: 22, left: 913, top: 525, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Extra_Skill2_Txt" className="ExtraSkill2Txt" style={{width: 78, height: 22, left: 913, top: 571, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Extra_Member_Txt" className="ExtraMemberTxt" style={{width: 78, height: 22, left: 1020, top: 525, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Extra_Member2_Txt" className="ExtraMember2Txt" style={{width: 78, height: 22, left: 1020, top: 571, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Year2_Skills2_Txt" className="Year2Skills2Txt" style={{width: 112, height: 22, left: 566, top: 571, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Year2_Skills3_Txt" className="Year2Skills3Txt" style={{width: 112, height: 22, left: 566, top: 614, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Year1_Skills2_Txt" className="Year1Skills2Txt" style={{width: 112, height: 22, left: 231, top: 571, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Year1_Skills3_Txt" className="Year1Skills3Txt" style={{width: 112, height: 22, left: 231, top: 614, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Year3_Skills3_Txt" className="Year3Skills3Txt" style={{width: 112, height: 22, left: 231, top: 718, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Year4_Skills_Txt" className="Year4SkillsTxt" style={{width: 112, height: 22, left: 566, top: 718, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Year3_Skills2_Txt" className="Year3Skills2Txt" style={{width: 112, height: 22, left: 231, top: 764, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Year3_Skills3_Txt2" className="Year3Skills3Txt2" style={{width: 112, height: 22, left: 231, top: 810, position: 'absolute', background: '#D9D9D9'}} />
</div>`;

const classMappings = {
  "NameTxt": "name-txt",
  "Name2Txt": "name2-txt",
  "Name3Txt": "name3-txt",
  "Name4Txt": "name4-txt",
  "Name5Txt": "name5-txt",
  "PointInt": "point-int",
  "Point2Int": "point2-int",
  "Point3Int": "point3-int",
  "Point4Int": "point4-int",
  "Point5Int": "point5-int",
  "RelationshipTxt": "relationship-txt",
  "Relationship2Txt": "relationship2-txt",
  "Relationship3Txt": "relationship3-txt",
  "Relationship4Txt": "relationship4-txt",
  "Relationship5Txt": "relationship5-txt",
  "BoneBaneTxt": "bool-bane-txt",
  "BoneBane2Txt": "bool-bane2-txt",
  "BoneBane3Txt": "bool-bane3-txt",
  "BoneBane4Txt": "bool-bane4-txt",
  "BoneBane5Txt": "bool-bane5-txt",
  "Year1SkillsTxt": "year1-skills-txt",
  "Year1Skills2Txt": "year1-skills2-txt",
  "Year1Skills3Txt": "year1-skills3-txt",
  "Year2SkillsTxt": "year2-skills-txt",
  "Year2Skills2Txt": "year2-skills2-txt",
  "Year2Skills3Txt": "year2-skills3-txt",
  "Year3Skills2Txt": "year3-skills2-txt",
  "Year3Skills3Txt": "year3-skills-txt",
  "Year3Skills3Txt2": "year3-skills3-txt",
  "Year4SkillsTxt": "year4-skills-txt",
  "ExtraNameTxt": "ex-name-txt",
  "ExtraName2Txt": "ex-name2-txt",
  "JobEmployerTxt": "employer-txt",
  "JobEmployer2Txt": "employer2-txt",
  "JobEmployer3Txt": "employer3-txt",
  "JobTxt": "job-txt",
  "CoworkerTxt": "coworker-txt",
  "ExtraSkillTxt": "ex-skills-txt",
  "ExtraSkill2Txt": "ex-skills2-txt",
  "ExtraMemberTxt": "ex-member-txt",
  "ExtraMember2Txt": "ex-member2-txt"
};

const extracts = html.match(/<div.*?class(Name)?="([^"]+)"[^>]*>/g);
let cssLines = [];

for (let el of extracts) {
  let className = el.match(/class(Name)?="([^"]+)"/)[2];
  let leftMatch = el.match(/left:\s*(\d+)/);
  let topMatch = el.match(/top:\s*(\d+)/);
  let widthMatch = el.match(/width:\s*(\d+)/) || el.match(/width="(\d+)"/);
  let heightMatch = el.match(/height:\s*(\d+)/) || el.match(/height="(\d+)"/);

  if (leftMatch && topMatch && widthMatch && heightMatch) {
    let leftPct = (parseInt(leftMatch[1]) / 1173 * 100).toFixed(4);
    let topPct = (parseInt(topMatch[1]) / 896 * 100).toFixed(4);
    let widPct = (parseInt(widthMatch[1]) / 1173 * 100).toFixed(4);
    let heiPct = (parseInt(heightMatch[1]) / 896 * 100).toFixed(4);

    let mappedClass = classMappings[className] || className;
    if (className === "Year3Skills3Txt2") mappedClass = "year3-skills3-txt"; 
    if (className === "Year3Skills3Txt") mappedClass = "year3-skills-txt"; // Year3 has 3 inputs: skills, skills2, skills3
    
    cssLines.push('.' + mappedClass + ' { left: ' + leftPct + '%; top: ' + topPct + '%; width: ' + widPct + '%; height: ' + heiPct + '%; }');
  }
}

console.log(cssLines.join('\\n'));

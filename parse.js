const fs = require('fs');

const raw = `
<div data-layer="Frame 1" className="Frame1" style={{width: 1412.69, height: 1080, position: 'relative'}}>
  <img data-layer="Strixhaven 1" className="Strixhaven1" style={{width: 1412.69, height: 1080, left: 0, top: 0, position: 'absolute'}} src="https://placehold.co/1413x1080" />
  <div data-svg-wrapper data-layer="InspirationCheckBox" className="Inspirationcheckbox" style={{left: 840, top: 234, position: 'absolute'}}>
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="27" height="27" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="InspirationCheckBox" className="Inspirationcheckbox" style={{left: 840, top: 278, position: 'absolute'}}>
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="27" height="27" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="InspirationCheckBox" className="Inspirationcheckbox" style={{left: 840, top: 323, position: 'absolute'}}>
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="27" height="27" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="InspirationCheckBox" className="Inspirationcheckbox" style={{left: 840, top: 368, position: 'absolute'}}>
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="27" height="27" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="InspirationCheckBox" className="Inspirationcheckbox" style={{left: 840, top: 413, position: 'absolute'}}>
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="27" height="27" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Extracurriculars_CheckBox" className="ExtracurricularsCheckbox" style={{left: 1043, top: 626, position: 'absolute'}}>
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="27" height="27" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Extracurriculars_CheckBox" className="ExtracurricularsCheckbox" style={{left: 1043, top: 690, position: 'absolute'}}>
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="27" height="27" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year1CheckBox" className="Year1checkbox" style={{left: 119, top: 640, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year1_2_2CheckBox" className="Year122checkbox" style={{left: 146, top: 694, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year1_2_3CheckBox" className="Year123checkbox" style={{left: 196, top: 694, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year1_2_4CheckBox" className="Year124checkbox" style={{left: 223, top: 694, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year1_3_4CheckBox" className="Year134checkbox" style={{left: 223, top: 748, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year1_3_3CheckBox" className="Year133checkbox" style={{left: 196, top: 748, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year1_3_2CheckBox" className="Year132checkbox" style={{left: 146, top: 748, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year1_3_1CheckBox" className="Year131checkbox" style={{left: 119, top: 748, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year3CheckBox" className="Year3checkbox" style={{left: 119, top: 872, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year3_2CheckBox" className="Year32checkbox" style={{left: 146, top: 872, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year3_3CheckBox" className="Year33checkbox" style={{left: 196, top: 872, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year3_4CheckBox" className="Year34checkbox" style={{left: 223, top: 872, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year3_2_1CheckBox" className="Year321checkbox" style={{left: 110, top: 929, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year3_2_2CheckBox" className="Year322checkbox" style={{left: 134, top: 929, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year3_2_3CheckBox" className="Year323checkbox" style={{left: 155, top: 929, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year3_2_4CheckBox" className="Year324checkbox" style={{left: 196, top: 929, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year3_2_5CheckBox" className="Year325checkbox" style={{left: 223, top: 929, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year3_3_4CheckBox" className="Year334checkbox" style={{left: 223, top: 980, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year3_3_3CheckBox" className="Year333checkbox" style={{left: 196, top: 980, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year3_3_2CheckBox" className="Year332checkbox" style={{left: 146, top: 980, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year3_3_1CheckBox" className="Year331checkbox" style={{left: 119, top: 980, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year1_2_1CheckBox" className="Year121checkbox" style={{left: 119, top: 694, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year1_1CheckBox" className="Year11checkbox" style={{left: 146, top: 641, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year1_2CheckBox" className="Year12checkbox" style={{left: 196, top: 640, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year1_3CheckBox" className="Year13checkbox" style={{left: 223, top: 640, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H18V20H0V0Z" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year2CheckBox" className="Year2checkbox" style={{left: 517, top: 640, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year2_2_1CheckBox" className="Year221checkbox" style={{left: 517, top: 694, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year2_2_2CheckBox" className="Year222checkbox" style={{left: 544, top: 694, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year2_3_2CheckBox" className="Year232checkbox" style={{left: 543, top: 748, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year2_3_3CheckBox" className="Year233checkbox" style={{left: 583, top: 748, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year2_3_4CheckBox" className="Year234checkbox" style={{left: 607, top: 748, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year2_3_5CheckBox" className="Year235checkbox" style={{left: 631, top: 748, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year2_2_3CheckBox" className="Year223checkbox" style={{left: 594, top: 694, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year2_2_4CheckBox" className="Year224checkbox" style={{left: 621, top: 694, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year2_3_1CheckBox" className="Year231checkbox" style={{left: 517, top: 748, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year4CheckBox" className="Year4checkbox" style={{left: 517, top: 872, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year4_2CheckBox" className="Year42checkbox" style={{left: 543, top: 872, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year4_3CheckBox" className="Year43checkbox" style={{left: 594, top: 872, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="NoTime_CheckBox" className="NotimeCheckbox" style={{left: 594, top: 927, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="NoTime2_CheckBox" className="Notime2Checkbox" style={{left: 620, top: 927, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year4_4CheckBox" className="Year44checkbox" style={{left: 620, top: 872, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year2_2CheckBox" className="Year22checkbox" style={{left: 544, top: 640, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year2_3CheckBox" className="Year23checkbox" style={{left: 594, top: 640, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Year2_4CheckBox" className="Year24checkbox" style={{left: 621, top: 640, position: 'absolute'}}>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="20" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-layer="Name_Txt" className="NameTxt" style={{width: 309, height: 31, left: 86, top: 230, position: 'absolute', background: '#D9D9D9'}} />
  <div data-svg-wrapper data-layer="Point_Int" className="PointInt" style={{left: 424, top: 230, position: 'absolute'}}>
    <svg width="46" height="31" viewBox="0 0 46 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="46" height="31" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Point2_Int" className="Point2Int" style={{left: 424, top: 278, position: 'absolute'}}>
    <svg width="46" height="31" viewBox="0 0 46 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="46" height="31" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Point3_Int" className="Point3Int" style={{left: 424, top: 323, position: 'absolute'}}>
    <svg width="46" height="31" viewBox="0 0 46 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="46" height="31" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Point4_Int" className="Point4Int" style={{left: 424, top: 369, position: 'absolute'}}>
    <svg width="46" height="31" viewBox="0 0 46 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="46" height="31" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Point5_Int" className="Point5Int" style={{left: 424, top: 409, position: 'absolute'}}>
    <svg width="46" height="31" viewBox="0 0 46 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="46" height="31" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-layer="Relationship_Txt" className="RelationshipTxt" style={{width: 309, height: 31, left: 505, top: 230, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Relationship2_Txt" className="Relationship2Txt" style={{width: 309, height: 31, left: 505, top: 278, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Relationship3_Txt" className="Relationship3Txt" style={{width: 309, height: 31, left: 505, top: 323, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Relationship4_Txt" className="Relationship4Txt" style={{width: 309, height: 31, left: 505, top: 368, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Relationship5_Txt" className="Relationship5Txt" style={{width: 309, height: 31, left: 505, top: 409, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Bool/Bane_Txt" className="BoolBaneTxt" style={{width: 309, height: 31, left: 924, top: 230, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Bool/Bane2_Txt" className="BoolBane2Txt" style={{width: 309, height: 31, left: 924, top: 278, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Bool/Bane3_Txt" className="BoolBane3Txt" style={{width: 309, height: 31, left: 924, top: 323, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Bool/Bane4_Txt" className="BoolBane4Txt" style={{width: 309, height: 31, left: 924, top: 369, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Bool/Bane5_Txt" className="BoolBane5Txt" style={{width: 309, height: 31, left: 924, top: 409, position: 'absolute', background: '#D9D9D9'}} />
  <div data-svg-wrapper data-layer="Ex_Skills_Txt" className="ExSkillsTxt" style={{left: 1093, top: 619, position: 'absolute'}}>
    <svg width="64" height="31" viewBox="0 0 64 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="31" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-svg-wrapper data-layer="Ex_Skills2_Txt" className="ExSkills2Txt" style={{left: 1093, top: 689, position: 'absolute'}}>
    <svg width="64" height="31" viewBox="0 0 64 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="31" fill="#D9D9D9"/>
    </svg>
  </div>
  <div data-layer="Ex_Name_Txt" className="ExNameTxt" style={{width: 159, height: 31, left: 867, top: 686, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Employer_Txt" className="EmployerTxt" style={{width: 456, height: 31, left: 867, top: 908, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Job_Txt" className="JobTxt" style={{width: 138, height: 31, left: 867, top: 980, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Coworker_Txt" className="CoworkerTxt" style={{width: 253, height: 31, left: 1070, top: 980, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Ex_Name_Txt" className="ExNameTxt" style={{width: 159, height: 31, left: 867, top: 619, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Ex_Member_Txt" className="ExMemberTxt" style={{width: 159, height: 31, left: 1189, top: 619, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Ex_Member2_Txt" className="ExMember2Txt" style={{width: 159, height: 31, left: 1189, top: 683, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Name2_Txt" className="Name2Txt" style={{width: 309, height: 31, left: 86, top: 278, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Name3_Txt" className="Name3Txt" style={{width: 309, height: 31, left: 86, top: 323, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Name4_Txt" className="Name4Txt" style={{width: 309, height: 31, left: 86, top: 368, position: 'absolute', background: '#D9D9D9'}} />
  <div data-layer="Name5_Txt" className="Name5Txt" style={{width: 309, height: 31, left: 86, top: 410, position: 'absolute', background: '#D9D9D9'}} />
`;

const regex = /data-layer="([^"]+)"[\s\S]*?style=\{\{([^}]+)\}\}/g;
let match;

let cssOutput = "";
let jsxOutput = "";

const counts = {};

while ((match = regex.exec(raw)) !== null) {
  let layer = match[1];
  const styleStr = match[2];
  let left = 0, top = 0, width = null, height = null;
  styleStr.split(',').forEach(s => {
    const [k, v] = s.split(':').map(x => x.trim().replace(/['"]/g, ''));
    if (k === 'left') left = parseFloat(v);
    if (k === 'top') top = parseFloat(v);
    if (k === 'width') width = parseFloat(v);
    if (k === 'height') height = parseFloat(v);
  });
  
  if (layer === 'Strixhaven 1') continue;

  if (layer.includes('Name') || layer.includes('Point') || layer.includes('Relationship') || layer.includes('Bool/Bane')) {
      if (!layer.includes('Ex_')) {
          if (top >= 225 && top <= 235) top = 234;
          if (top >= 270 && top <= 285) top = 278;
          if (top >= 315 && top <= 330) top = 323;
          if (top >= 360 && top <= 375) top = 368;
          if (top >= 405 && top <= 420) top = 413;
      }
  }

  // Find natural dimensions if none
  if (width === null || height === null) {
      if (layer.includes('Extracurriculars') && layer.includes('CheckBox')) {
          width = 27; height = 27;
      } else if (layer.includes('CheckBox')) {
          width = 18; height = 20;
      } else if (layer.includes('Point')) {
          width = 46; height = 31;
      } else if (layer.includes('Ex_Skills')) {
          width = 64; height = 31;
      }
  }

  // Visual optical alignment offset for report card checkboxes leaning bottom-right
  if (layer.includes('Year') || layer.includes('NoTime')) {
      left -= 3;
      top -= 3;
  }

  // Deduplicate named nodes specifically if multiple present
  if (layer === "Ex_Name_Txt") {
    counts[layer] = (counts[layer] || 0) + 1;
    if (counts[layer] === 1) layer = "Ex_Name_Txt";
    if (counts[layer] === 2) layer = "Ex_Name2_Txt";
  }
  if (layer === "Extracurriculars_CheckBox") {
    counts[layer] = (counts[layer] || 0) + 1;
    if (counts[layer] === 1) layer = "Extracurriculars_CheckBox";
    if (counts[layer] === 2) layer = "Extracurriculars2_CheckBox";
  }

  const pLeft = ((left / 1412.69) * 100).toFixed(4) + '%';
  const pTop = ((top / 1080) * 100).toFixed(4) + '%';
  const pWidth = width ? ((width / 1412.69) * 100).toFixed(4) + '%' : null;
  const pHeight = height ? ((height / 1080) * 100).toFixed(4) + '%' : null;
  
  // Safe class name logic
  let className = layer.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();

  // Distinguish multiple InspirationCheckBox items by index
  let inspIdx = 0;
  if (layer === "InspirationCheckBox") {
     if (top === 278) inspIdx = 1;
     if (top === 323) inspIdx = 2;
     if (top === 368) inspIdx = 3;
     if (top === 413) inspIdx = 4;
     className += '-' + inspIdx;
  }
  
  cssOutput += "." + className + " { left: " + pLeft + "; top: " + pTop + "; width: " + pWidth + "; height: " + pHeight + "; }\n";
  
  let inputType = "text";
  let baseClass = "input";
  if (layer.endsWith('CheckBox')) {
      inputType = "checkbox";
      baseClass = "checkbox";
  }
  if (layer.endsWith('_Int') || layer.endsWith('_D4')) {
      inputType = "number";
      baseClass = "input";
  }
  
  let stateBinding = "";
  
  const relMap = { "Name_Txt": [0, "name"], "Name2_Txt": [1, "name"], "Name3_Txt": [2, "name"], "Name4_Txt": [3, "name"], "Name5_Txt": [4, "name"],
                 "Point_Int": [0, "points"], "Point2_Int": [1, "points"], "Point3_Int": [2, "points"], "Point4_Int": [3, "points"], "Point5_Int": [4, "points"],
                 "Relationship_Txt": [0, "relationship"], "Relationship2_Txt": [1, "relationship"], "Relationship3_Txt": [2, "relationship"], "Relationship4_Txt": [3, "relationship"], "Relationship5_Txt": [4, "relationship"],
                 "BoolBane_Txt": [0, "boonBane"], "BoolBane2_Txt": [1, "boonBane"], "BoolBane3_Txt": [2, "boonBane"], "BoolBane4_Txt": [3, "boonBane"], "BoolBane5_Txt": [4, "boonBane"] };
  
  if (layer.startsWith('Bool/Bane')) {
      const matchKey = layer.replace('/', '');
      if (relMap[matchKey]) {
          const [idx, field] = relMap[matchKey];
          stateBinding = ' value={formData.relationships['+idx+'].' + field + '} onChange={e => updateData("relationships", '+idx+', "'+field+'", e.target.value)}';
      }
  } else if (relMap[layer]) {
      const [idx, field] = relMap[layer];
      if (inputType === "number") {
          stateBinding = ' value={formData.relationships['+idx+'].' + field + '} onChange={e => updateData("relationships", '+idx+', "'+field+'", Number(e.target.value))}';
      } else {
          stateBinding = ' value={formData.relationships['+idx+'].' + field + '} onChange={e => updateData("relationships", '+idx+', "'+field+'", e.target.value)}';
      }
  }

  if (layer === "InspirationCheckBox") {
     stateBinding = ' checked={formData.relationships['+inspIdx+'].inspiration} onChange={e => updateData("relationships", '+inspIdx+', "inspiration", e.target.checked)}';
  }

  if (layer === "Ex_Name_Txt") stateBinding = ' value={formData.extracurriculars[0].name} onChange={e => updateData("extracurriculars", 0, "name", e.target.value)}';
  if (layer === "Ex_Name2_Txt") stateBinding = ' value={formData.extracurriculars[1].name} onChange={e => updateData("extracurriculars", 1, "name", e.target.value)}';
  
  if (layer === "Ex_Skills_Txt") stateBinding = ' value={formData.extracurriculars[0].skills} onChange={e => updateData("extracurriculars", 0, "skills", e.target.value)}';
  if (layer === "Ex_Skills2_Txt") stateBinding = ' value={formData.extracurriculars[1].skills} onChange={e => updateData("extracurriculars", 1, "skills", e.target.value)}';
  
  if (layer === "Extracurriculars_CheckBox") {
      stateBinding = ' checked={formData.extracurriculars[0].d4} onChange={e => updateData("extracurriculars", 0, "d4", e.target.checked)}';
  }
  if (layer === "Extracurriculars2_CheckBox") {
      stateBinding = ' checked={formData.extracurriculars[1].d4} onChange={e => updateData("extracurriculars", 1, "d4", e.target.checked)}';
  }
  
  if (layer === "Ex_Member_Txt") stateBinding = ' checked={formData.extracurriculars[0].member} onChange={e => updateData("extracurriculars", 0, "member", e.target.checked)}';
  if (layer === "Ex_Member2_Txt") stateBinding = ' checked={formData.extracurriculars[1].member} onChange={e => updateData("extracurriculars", 1, "member", e.target.checked)}';

  if (layer === "Employer_Txt") stateBinding = ' value={formData.job.employer} onChange={e => setFormData({...formData, job: {...formData.job, employer: e.target.value}})}';
  if (layer === "Job_Txt") stateBinding = ' value={formData.job.job} onChange={e => setFormData({...formData, job: {...formData.job, job: e.target.value}})}';
  if (layer === "Coworker_Txt") stateBinding = ' value={formData.job.coworker} onChange={e => setFormData({...formData, job: {...formData.job, coworker: e.target.value}})}';

  const isInput = layer.endsWith('_Txt') || layer.endsWith('_Int') || layer.endsWith('CheckBox') || layer.endsWith('_D4');

  if (isInput) {
      jsxOutput += '        <input type="' + inputType + '" className="' + baseClass + ' ' + className + '" data-layer="' + layer + '"' + stateBinding + ' />\n';
  } else {
      jsxOutput += '        <div className="' + className + '" data-layer="' + layer + '"></div>\n';
  }
}

fs.writeFileSync('out_css.txt', cssOutput);
fs.writeFileSync('out_jsx.txt', jsxOutput);
console.log('Done!');

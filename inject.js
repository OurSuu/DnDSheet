const fs = require('fs');

const jsxPath = 'client/src/StrixhavenSheet.jsx';
const cssPath = 'client/src/StrixhavenSheet.css';

let jsxStr = fs.readFileSync('out_jsx.txt', 'utf8');
let cssStr = fs.readFileSync('out_css.txt', 'utf8');

// Read current files
let existingJsx = fs.readFileSync(jsxPath, 'utf8');
let existingCss = fs.readFileSync(cssPath, 'utf8');

// Replace JSX
const jsxStartTag = '{/* AUTO-GENERATED STRICT INPUTS */}';
const startIdx = existingJsx.indexOf(jsxStartTag);

if (startIdx !== -1) {
  const before = existingJsx.substring(0, startIdx);
  const after = "      </div>\n    </div>\n  );\n}\n\nexport default StrixhavenSheet;\n";
  fs.writeFileSync(jsxPath, before + "        {/* AUTO-GENERATED STRICT INPUTS */}\n" + jsxStr + after);
  console.log("Injected JSX!");
} else {
  console.log("Failed to find start tag");
}

// Replace CSS
const cssStartTag = '/* =========================================\n   ABSOLUTE POSITIONING LAYOUT\n   ========================================= */\n\n';
const cssStartIdx = existingCss.indexOf(cssStartTag);
if (cssStartIdx !== -1) {
  const beforeCss = existingCss.substring(0, cssStartIdx + cssStartTag.length);
  fs.writeFileSync(cssPath, beforeCss + cssStr);
  console.log("Injected CSS!");
} else {
  console.log("Failed to find CSS start tag");
}

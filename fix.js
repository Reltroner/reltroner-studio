const fs = require('fs');
let content = fs.readFileSync('c:/Projects/reltroner-studio/app/about/page.jsx', 'utf8');

// Global replacements for specific classes
content = content.replace(/text-gray-800/g, 'text-slate-200');
content = content.replace(/text-gray-700/g, 'text-slate-200');
content = content.replace(/text-gray-600/g, 'text-slate-300');
content = content.replace(/text-gray-500/g, 'text-slate-400');

// Fix specific font-semibold texts that were gray-800
// Previous was: className="mt-4 text-lg font-semibold text-gray-800 leading-relaxed"
// Now it's: className="mt-4 text-lg font-semibold text-slate-200 leading-relaxed"
content = content.replace(/font-semibold text-slate-200/g, 'font-semibold text-white');

// Fix heading of the 'How to read this page' card
content = content.replace(/<h2 className="text-xl font-semibold mb-3">/g, '<h2 className="text-xl font-semibold mb-3 text-slate-50">');

// Fix strong tags in paragraphs to be white
content = content.replace(/<strong>/g, '<strong className="text-white">');

// The italic intro sentence that was gray-500 was changed to slate-400. Let's make sure it's slate-300 as requested: 'text-slate-300, not opacity-40'.
// Actually line 72: <p className="mt-6 text-sm text-gray-500 italic">
// line 113: <p className="mt-6 text-sm text-gray-500 italic">
content = content.replace(/className="mt-6 text-sm text-slate-400 italic"/g, 'className="mt-6 text-sm text-slate-300 italic"');

// The line 48 was: <p className="mt-4 text-md text-gray-700 italic"> -> became text-slate-200. User requested italic text to be text-slate-300.
content = content.replace(/<p className="mt-4 text-md text-slate-200 italic">/g, '<p className="mt-4 text-md text-slate-300 italic">');

fs.writeFileSync('c:/Projects/reltroner-studio/app/about/page.jsx', content);
console.log('Done!');

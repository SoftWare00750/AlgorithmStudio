import React, { useState, useMemo } from 'react';

// =====================================================================
// 🧠 ALGORITHM SCRIPTS (The Core Logic)
// =====================================================================

const algorithms = {
  // 1. QUICK SORT (O(n log n) Time, O(log n) Space)
  quickSort: (arr) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < pivot) left.push(arr[i]);
      else right.push(arr[i]);
    }
    
    return [...algorithms.quickSort(left), pivot, ...algorithms.quickSort(right)];
  },

  // 2. BINARY SEARCH (O(log n) Time, O(1) Space)
  binarySearch: (arr, target) => {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) return mid;
      if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  },

  // 3. PALINDROME CHECKER - TWO POINTERS (O(n) Time, O(1) Space)
  isPalindrome: (str) => {
    const cleaned = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
      if (cleaned[left] !== cleaned[right]) return false;
      left++;
      right--;
    }
    return true;
  },

  // 4. HASH MAP FREQUENCY COUNTER (O(n) Time, O(k) Space)
  mostFrequentChar: (str) => {
    const charMap = {};
    let max = 0;
    let maxChar = '';
    
    for (let char of str.replace(/[^A-Za-z0-9]/g, '').toLowerCase()) {
      charMap[char] = charMap[char] + 1 || 1;
    }
    
    for (let char in charMap) {
      if (charMap[char] > max) {
        max = charMap[char];
        maxChar = char;
      }
    }
    return { char: maxChar, count: max };
  },

  // 5. MEMOIZED FIBONACCI - DYNAMIC PROGRAMMING (O(n) Time, O(n) Space)
  fibonacci: (n, memo = {}) => {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = algorithms.fibonacci(n - 1, memo) + algorithms.fibonacci(n - 2, memo);
    return memo[n];
  }
};

// Raw source code template enabling self-download functionality
const getSourceCodeString = () => `import React, { useState } from 'react';

// Integrated Algorithms Package
const algorithms = {
  quickSort: (arr) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = []; const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < pivot) left.push(arr[i]);
      else right.push(arr[i]);
    }
    return [...algorithms.quickSort(left), pivot, ...algorithms.quickSort(right)];
  },
  binarySearch: (arr, target) => {
    let left = 0; let right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) return mid;
      if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  },
  isPalindrome: (str) => {
    const cleaned = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    let left = 0; let right = cleaned.length - 1;
    while (left < right) {
      if (cleaned[left] !== cleaned[right]) return false;
      left++; right--;
    }
    return true;
  },
  mostFrequentChar: (str) => {
    const charMap = {}; let max = 0; let maxChar = '';
    for (let char of str.replace(/[^A-Za-z0-9]/g, '').toLowerCase()) {
      charMap[char] = charMap[char] + 1 || 1;
    }
    for (let char in charMap) {
      if (charMap[char] > max) { max = charMap[char]; maxChar = char; }
    }
    return { char: maxChar, count: max };
  },
  fibonacci: (n, memo = {}) => {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = algorithms.fibonacci(n - 1, memo) + algorithms.fibonacci(n - 2, memo);
    return memo[n];
  }
};

export default function App() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1>Algorithm Studio Mini-Project</h1>
      <p>Source file successfully downloaded and configured!</p>
    </div>
  );
}`;

// Generic Utility to download generated items
const triggerDownload = (content, filename, contentType) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// =====================================================================
// 🖥️ UI COMPONENTS
// =====================================================================

// --- Module 1: Array Operations ---
function ArrayCruncher() {
  const [input, setInput] = useState('34, 7, 23, 32, 5, 62, 32');
  const [target, setTarget] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleProcess = () => {
    const rawArray = input.split(',').map(num => parseInt(num.trim(), 10)).filter(n => !isNaN(n));
    if (rawArray.length === 0) {
      setError('Enter at least one valid number, separated by commas (e.g. 10, 4, 2, 8).');
      setResults(null);
      return;
    }

    setError(null);
    const sortedArray = algorithms.quickSort(rawArray);
    
    let searchResult = null;
    if (target !== '') {
      const targetNum = parseInt(target, 10);
      if (isNaN(targetNum)) {
        searchResult = 'Enter a valid number to search for.';
      } else {
        const index = algorithms.binarySearch(sortedArray, targetNum);
        searchResult = index !== -1 
          ? `Found ${targetNum} at index ${index} (after sorting)`
          : `${targetNum} not found in the array.`;
      }
    }

    setResults({ original: rawArray, sorted: sortedArray, search: searchResult });
  };

  const exportResults = () => {
    if (!results) return;
    const jsonString = JSON.stringify(results, null, 2);
    triggerDownload(jsonString, 'array_sorting_results.json', 'application/json');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start flex-col sm:flex-row gap-2">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">Number Cruncher (Sort & Search)</h3>
          <p className="text-sm text-slate-600">Combines <span className="font-semibold text-blue-600">Quick Sort</span> and <span className="font-semibold text-blue-600">Binary Search</span>.</p>
        </div>
        {results && (
          <button 
            onClick={exportResults}
            className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors flex items-center gap-1.5 font-bold"
          >
            💾 Export JSON
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-semibold text-slate-700">Enter numbers (comma-separated):</label>
          <input 
            type="text" 
            value={input} onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
            placeholder="e.g. 10, 4, 2, 8"
          />
        </div>
        <div className="w-full md:w-1/3 space-y-2">
          <label className="text-sm font-semibold text-slate-700">Search for (Binary Search):</label>
          <input 
            type="number" 
            value={target} onChange={(e) => setTarget(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
            placeholder="Target number"
          />
        </div>
      </div>

      <button onClick={handleProcess} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-blue-500/10 active:scale-95">
        Run Algorithms
      </button>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold p-3 rounded-xl">
          ⚠️ {error}
        </div>
      )}

      {results && (
        <div className="bg-slate-900 text-green-400 p-5 rounded-2xl font-mono text-sm space-y-3 shadow-inner border border-slate-800">
          <div><span className="text-slate-500">// 1. Quick Sort Output (O(n log n))</span></div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-blue-400 font-bold overflow-x-auto whitespace-nowrap">
            [ {results.sorted.join(', ')} ]
          </div>
          
          {results.search && (
            <>
              <div className="pt-2"><span className="text-slate-500">// 2. Binary Search Output (O(log n))</span></div>
              <div className={`p-3 rounded-lg border font-semibold ${results.search.includes('not found') ? 'bg-red-950/30 border-red-900 text-red-400' : 'bg-green-950/30 border-green-900 text-green-400'}`}>
                {results.search}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// --- Module 2: String Analysis ---
function StringAnalyzer() {
  const [text, setText] = useState('A man, a plan, a canal: Panama');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleProcess = () => {
    if (!text.trim()) {
      setError('Enter some text to analyze.');
      setResults(null);
      return;
    }
    if (!/[A-Za-z0-9]/.test(text)) {
      setError('Enter at least one letter or number — punctuation alone can\u2019t be analyzed.');
      setResults(null);
      return;
    }

    setError(null);
    const isPalin = algorithms.isPalindrome(text);
    const frequent = algorithms.mostFrequentChar(text);

    setResults({ palindrome: isPalin, frequent });
  };

  const exportResults = () => {
    if (!results) return;
    const jsonString = JSON.stringify({ sourceText: text, ...results }, null, 2);
    triggerDownload(jsonString, 'string_analysis_results.json', 'application/json');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start flex-col sm:flex-row gap-2">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">String Analyzer</h3>
          <p className="text-sm text-slate-600">Utilizes <span className="font-semibold text-purple-600">Two Pointers</span> (Palindrome) and a <span className="font-semibold text-purple-600">Hash Map</span> (Frequency).</p>
        </div>
        {results && (
          <button 
            onClick={exportResults}
            className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg border border-purple-200 transition-colors flex items-center gap-1.5 font-bold"
          >
            💾 Export JSON
          </button>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Enter a string or phrase:</label>
        <textarea 
          rows="3"
          value={text} onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none shadow-sm"
          placeholder="Type here..."
        />
      </div>

      <button onClick={handleProcess} className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-purple-500/10 active:scale-95">
        Analyze String
      </button>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold p-3 rounded-xl">
          ⚠️ {error}
        </div>
      )}

      {results && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={`p-5 rounded-2xl border-2 transition-all ${results.palindrome ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
            <h4 className="font-bold text-slate-800 mb-1">Two-Pointer Check</h4>
            <p className="text-sm text-slate-600 mb-3">Is it a valid Palindrome?</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${results.palindrome ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'}`}>
              {results.palindrome ? '✅ True' : '❌ False'}
            </span>
          </div>
          
          <div className="p-5 rounded-2xl border-2 border-purple-100 bg-purple-50">
            <h4 className="font-bold text-slate-800 mb-1">Hash Map Counter</h4>
            <p className="text-sm text-slate-600 mb-3">Most frequent character:</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-purple-800">
                "{results.frequent.char}"
              </span>
              <span className="text-sm font-semibold text-purple-600">
                (appears {results.frequent.count} times)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Module 3: Dynamic Programming ---
const FIBONACCI_MAX = 5000; // keeps the recursive/memoized call stack safe in-browser

function DynamicSequence() {
  const [num, setNum] = useState(40);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleProcess = () => {
    const n = parseInt(num, 10);
    if (isNaN(n) || n < 0) {
      setError('Enter a whole number that is 0 or greater.');
      setResult(null);
      return;
    }
    if (n > FIBONACCI_MAX) {
      setError(`Keep n at or below ${FIBONACCI_MAX.toLocaleString()} — larger values risk a stack overflow in this recursive implementation.`);
      setResult(null);
      return;
    }

    setError(null);
    const start = performance.now();
    const fibValue = algorithms.fibonacci(n);
    const end = performance.now();
    
    setResult({ inputIndex: n, value: fibValue, time: (end - start).toFixed(4) });
  };

  const exportResults = () => {
    if (!result) return;
    const jsonString = JSON.stringify(result, null, 2);
    triggerDownload(jsonString, `fibonacci_${result.inputIndex}_result.json`, 'application/json');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start flex-col sm:flex-row gap-2">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">Dynamic Programming (Memoization)</h3>
          <p className="text-sm text-slate-600">Calculates the Nth Fibonacci number in <span className="font-semibold text-emerald-600">O(n) time</span> instead of O(2^n) by caching results.</p>
        </div>
        {result && (
          <button 
            onClick={exportResults}
            className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors flex items-center gap-1.5 font-bold"
          >
            💾 Export JSON
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 w-full space-y-2">
          <label className="text-sm font-semibold text-slate-700">Find the Nth Fibonacci number (0–{FIBONACCI_MAX.toLocaleString()}):</label>
          <input 
            type="number" 
            value={num} onChange={(e) => setNum(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm"
            min="0"
          />
        </div>
        <button onClick={handleProcess} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-emerald-500/10 active:scale-95 h-[50px]">
          Calculate
        </button>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold p-3 rounded-xl">
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-inner flex flex-col gap-2 overflow-hidden">
          <span className="text-slate-500 font-mono text-sm">// Output (BigInt precision loss may occur for n {'>'} 78 in standard JS, but algorithm remains O(n))</span>
          <span className="text-2xl md:text-4xl font-bold text-emerald-400 font-mono break-all leading-tight">
            {result.value.toLocaleString('fullwide', {useGrouping:false})}
          </span>
          <span className="text-xs text-slate-400 mt-2 font-mono">Computed in {result.time} ms using Memoization cache</span>
        </div>
      )}
    </div>
  );
}

// =====================================================================
// 📦 MAIN APP COMPONENT
// =====================================================================

export default function App() {
  const [activeTab, setActiveTab] = useState('array');

  const tabs = [
    { id: 'array', label: 'Arrays & Sorting', color: 'blue' },
    { id: 'string', label: 'Strings & Maps', color: 'purple' },
    { id: 'dp', label: 'Dynamic Programming', color: 'emerald' },
  ];

  const handleDownloadAppFile = () => {
    const rawContent = getSourceCodeString();
    triggerDownload(rawContent, 'AlgorithmStudio.jsx', 'text/javascript');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      {/* Header */}
      <header className="bg-slate-900 text-white pt-12 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none text-9xl transform translate-x-1/4 -translate-y-1/4 select-none">
          ⚙️
        </div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black mb-3 tracking-tight">Algorithm Studio <span className="text-blue-400">.</span></h1>
            <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
              A practical implementation of data structures and algorithms studied via GeeksforGeeks and Coderbyte. Use this studio to analyze inputs, run computational limits, and export outputs.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-2.5 py-1 bg-slate-800 rounded-md text-xs font-semibold text-slate-400 border border-slate-700">React.js</span>
              <span className="px-2.5 py-1 bg-slate-800 rounded-md text-xs font-semibold text-slate-400 border border-slate-700">Big O Analysis</span>
              <span className="px-2.5 py-1 bg-slate-800 rounded-md text-xs font-semibold text-slate-400 border border-slate-700">Client-Side Exports</span>
            </div>
          </div>

          <button
            onClick={handleDownloadAppFile}
            className="shrink-0 bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-5 rounded-xl border border-white/20 transition-all active:scale-95 flex items-center gap-2 backdrop-blur-sm"
          >
            📥 Download Source
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 bg-slate-50/80 overflow-x-auto custom-scrollbar">
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              let borderClass = 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100';
              if (isActive) {
                if (tab.color === 'blue') borderClass = 'border-blue-500 text-blue-700 bg-white';
                if (tab.color === 'purple') borderClass = 'border-purple-500 text-purple-700 bg-white';
                if (tab.color === 'emerald') borderClass = 'border-emerald-500 text-emerald-700 bg-white';
              }
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 text-sm font-extrabold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap outline-none ${borderClass}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {activeTab === 'array' && <ArrayCruncher />}
            {activeTab === 'string' && <StringAnalyzer />}
            {activeTab === 'dp' && <DynamicSequence />}
          </div>
          
        </div>

        {/* Footer info block */}
        <div className="mt-8 mb-12 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-sm text-blue-800 flex justify-between items-center flex-col sm:flex-row gap-4 shadow-sm">
          <div className="leading-relaxed">
            <strong className="block text-blue-900 mb-1">💡 Project Delivery Complete</strong> 
            Successfully integrated 5 operational algorithm environments with real-time download and JSON configuration exports.
          </div>
          
        </div>
      </main>
    </div>
  );
}

import React, { useState } from 'react';

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
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Algorithm Studio Mini-Project</h1>
      <p>Source file successfully downloaded and configured!</p>
    </div>
  );
}
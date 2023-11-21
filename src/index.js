// Import a module that was installed with npm
import p5 from 'p5'
// Import a variable from a JavaScript file from the project folder
import { mySketch } from './sketch.js'
// Import CSS styles in JavaScript
import './index.css'

import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase.js";

// Initialize p5.js
// p5 requires two arguments: new p5(sketch function, target DOM element)
new p5(mySketch, document.getElementById('sketch-holder'))

// Enable live reload while developing (https://esbuild.github.io/api/#live-reload)
if (process.env.NODE_ENV !== 'production') {
  new EventSource('/esbuild').addEventListener('change', () =>
    location.reload(),
  )
}

const dromenRef = collection(db, "dromen");
const submitButton = document.getElementById('verzendenKnop');

submitButton.addEventListener('click', async function () {
  let droomTextArea = document.getElementById('droomArea');

  if (droomTextArea.value !== "") {
    await addDoc(dromenRef, {
      droom: `${droomTextArea.value}`
    });

    let fieldRow = droomTextArea.parentElement;
    fieldRow.innerHTML = "<p>U wordt bedankt voor het indienen van uw droom. Thanks!</p>";
  }
});

// Get the buttons and the tab panels
let tabs = Array.from(document.querySelectorAll('[role="tab"]'));
let panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

// Add a click event listener to each tab
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove the current selection
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    panels.forEach(p => p.setAttribute('hidden', 'true'));

    // Add the new selection
    tab.setAttribute('aria-selected', 'true');
    let panel = document.getElementById(tab.getAttribute('aria-controls'));
    panel.removeAttribute('hidden');
  });
});
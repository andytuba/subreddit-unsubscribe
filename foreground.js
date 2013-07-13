var debug = true;

if (debug) console.log("loading");

var uhElement = document.querySelector('input[name=uh]');
var uh = uhElement.getAttribute('value');

if (debug) console.log("uh:", uh);
chrome.extension.sendMessage({ 'uh': uh });

if (debug) console.log("loaded");

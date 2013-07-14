var uhElement = document.querySelector('input[name=uh]');
var uh = uhElement.getAttribute('value');

chrome.extension.sendMessage({ 'uh': uh });

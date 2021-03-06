
var uh = '';
var subredditRE = /^https?:\/\/(?:[a-z]+).reddit.com\/r\/([\w\.\+]+)\//i
var subscribeApiEndpoint = 'http://www.reddit.com/api/subscribe';
var subredditInfoPrefix = 'http://www.reddit.com/r';
var subredditInfoSuffix = 'about.json';

function onclickUnsubscribe(info)
{
 	var match = info.linkUrl.match(subredditRE);
	var subreddit = match && match[1];
	if (typeof subreddit === "undefined") console.log("nothing to do", info.linkUrl);

	console.log("Attempting to unsubscribe from " + subreddit);
	getSubredditId(subreddit, unsubscribe)
}

function getSubredditId(subredditName) {
	var url = [subredditInfoPrefix, subredditName, subredditInfoSuffix].join('/');

	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.onreadystatechange = function() {
		if (xhr.readyState != XMLHttpRequest.DONE) return;

		try {
			var data = JSON.parse(xhr.response);
			var subredditId = data.data.name;
			unsubscribe(subredditId, subredditName);
		} catch(e) {
			console.log("Couldn't parse response", xhr, e);
		}
	};
	xhr.send()

}

function unsubscribe(subredditId, subredditName) {
	var formData = new FormData();
	formData.append('sr', subredditId);
	formData.append('action', 'unsub');
	formData.append('uh', uh);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", subscribeApiEndpoint, true);
	xhr.send(formData)

	console.log("Sending unsubscribe request for ", subredditName);

}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
   	uh = request.uh;
  });


chrome.contextMenus.create({
	title: "Unsubscribe from subreddit", 
	contexts:["link"], 
	targetUrlPatterns: [ 
		"*://reddit.com/r/*",
		"*://*.reddit.com/r/*"
		],
	onclick: onclickUnsubscribe
});


console.log("loaded unsubscribe");


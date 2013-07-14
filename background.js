
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

	console.log("unsubscribe from " + subreddit, "given", info);
	getSubredditId(subreddit, unsubscribe)
}

function getSubredditId(subredditName) {
	var url = [subredditInfoPrefix, subredditName, subredditInfoSuffix].join('/');

	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.onreadystatechange = function() {
		if (xhr.readyState != XMLHttpRequest.DONE) return;

		try {
		debugger;
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
	var params = {
		'sr': subredditId,
		'r': subredditName,
		'action': 'unsub',
		'uh': uh,
		'renderstyle': 'json'
	};
	var items = [];
	for (var key in params) {
		if (!params.hasOwnProperty(key)) continue;
		var item = key + '=' + params[key];
		items.push(item);
	}
	var data = items.join('&');

	var xhr = new XMLHttpRequest();
	xhr.open("POST", subscribeApiEndpoint);
	xhr.send(data)

}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension",
                request);
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


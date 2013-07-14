
var uh = '';
var subredditRE = /^https?:\/\/(?:[a-z]+).reddit.com\/r\/([\w\.\+]+)\//i
var subscribeApiEndpoint = 'http://reddit.com/api/subscribe';

function onclickUnsubscribe(info)
{
 	var match = info.linkUrl.match(subredditRE);
	var subreddit = match && match[1];
	if (typeof subreddit === "undefined") console.log("nothing to do", info.linkUrl);

	console.log("unsubscribe from " + subreddit, "given", info);
	unsubscribe(subreddit);	
}

function unsubscribe(subreddit) {
	var params = {
		'r': subreddit,
		'action': 'unsub',
		'uh': uh,
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
	xhr.send(JSON.stringify(data))

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


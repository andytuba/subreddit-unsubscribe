var subredditRE = /^https?:\/\/(?:[a-z]+).reddit.com\/r\/([\w\.\+]+)\//i

function unsubscribe(info)
{
 	var match = info.linkUrl.match(subredditRE);
	var subreddit = match && match[1];
	if (typeof subreddit === "undefined") console.log("nothing to do", info.linkUrl);

	console.log("unsubscribe from " + subreddit, "given", info);

}

chrome.contextMenus.create({
	title: "Unsubscribe from subreddit", 
	contexts:["link"], 
	targetUrlPatterns: [ 
		"*://reddit.com/r/*",
		"*://*.reddit.com/r/*"
		],
	onclick: unsubscribe
});


console.log("loaded unsubscribe");


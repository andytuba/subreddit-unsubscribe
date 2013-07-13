
var uh = '';
var subredditRE = /^https?:\/\/(?:[a-z]+).reddit.com\/r\/([\w\.\+]+)\//i

function unsubscribe(info)
{
 	var match = info.linkUrl.match(subredditRE);
	var subreddit = match && match[1];
	if (typeof subreddit === "undefined") console.log("nothing to do", info.linkUrl);

	console.log("unsubscribe from " + subreddit, "given", info);

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
	onclick: unsubscribe
});


console.log("loaded unsubscribe");


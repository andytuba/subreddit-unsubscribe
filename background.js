function unsubscribe(info)
{
	var url = info.hrefUrl;
	var subreddit = 'andytuba'; // TODO: parse subreddit from url

	console.log("unsubscribe from " + subreddit, "given", info);

}

chrome.contextMenus.create({
	title: "Unsubsribe from subreddit", 
	contexts:["link"], 
	/*
	targetUrlPatterns: [ 
		"*://reddit.com/r/*",
		"*://*.reddit.com/r/*"
		],
	*/
	onclick: unsubscribe
});


console.log("loaded unsubscribe");


var subredditRE = /.*/i;

function unsubscribe(info)
{
	var url = info.hrefUrl;
	var subreddit = 'andytuba'; // TODO: parse subreddit from url

	console.log("unsubscribe from " + subreddit, "given", info);

}

chrome.contextMenus.create({
	title: "Unsubsribe from subreddit", 
	contexts:["link"], 
	targetUrlPatterns: [ subredditRE ],
	onclick: unsubscribe
});

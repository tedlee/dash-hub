
// In the format USER/REPO
TARGET = "mbostock/d3"

window.onload = function feedMe() {

	$("#title").append(TARGET);
	callGitHub();

}

function callGitHub() {
	
	console.log("In callGitHub");

	// Send the request
	var url =  "https://api.github.com/repos/" + TARGET + "/commits";
	$.getJSON(url, function(data) {
		var messages = [];
		var time = [];
		commitsToday = 0

		for (i in data){
			messages.push(data[i].commit.message);
			time.push(data[i].commit.committer.date);

			var now = moment();
			console.log("Comparing: " + moment(time[i]).format("MMM Do YY") + "   with: " + now.format("MMM Do YY") );
			if ( moment(time[i]).format("MMM Do YY") == now.format("MMM Do YY") ){
				commitsToday += 1
				console.log("today!")
			}

			$("#commit-messages").append(messages[i] + " — " + getPrettyTime(time[i]) + "<br />");
		}
	});

	//console.log("Num commits today: " + commitsToday);
	//display("#commit-messages", messages)
	//display("#commit-messages", time)

}

function getPrettyTime (dirtyDate) {
	return moment(dirtyDate).fromNow();
}

function display (selector, data){
	for (i in data) {
		$(selector).append(data[i])
	}
}
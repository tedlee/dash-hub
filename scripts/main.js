
// In the format USER/REPO
TARGET = "tedlee/dash-hub"

window.onload = function feedMe() {

	$("#title").append(TARGET);
	callGitHub();

}

function grabCommits(){
	console.log('in')
}

function callGitHub() {
	
	console.log("In callGitHub");

	// Send the request
	var url =  "https://api.github.com/repos/" + TARGET + "/commits";
	var commitsToday = 0
	
	$.getJSON(url + "?callback=?", null, function(commits) {
		var messages = [];
		var time = [];
		

		for (i in commits.data){
			messages.push(commits.data[i].commit.message);
			time.push(commits.data[i].commit.committer.date);

			var now = moment();
			console.log("Compating: " + moment(time[i]).format("MMM Do YY") + "   with: " + now.format("MMM 12 YY") );
			if ( moment(time[i]).format("MMM Do YY") == now.format("MMM Do YY") ){
				commitsToday += 1
				console.log("today!")
			}
			
			$("#commit-messages").append(messages[i] + " — " + getPrettyTime(time[i]) + "<br />");
		}
	});

	$("#commits-today").append(commitsToday)
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
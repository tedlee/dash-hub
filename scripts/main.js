
// In the format USER/REPO
TARGET = "tedlee/dash-hub"

window.onload = function feedMe() {

	$("#title").append(TARGET);
	callGitHub();

}

function callGitHub() {
	
	console.log("In callGitHub");

	// Send the request
	var url =  "https://api.github.com/repos/" + TARGET + "/commits";
	var commitsToday = 0;
	var messages = [];
	var time = [];
	
	$.getJSON(url + "?callback=?", null, function(commits) {

		for (i in commits.data){
			messages.push(commits.data[i].commit.message);
			time.push(commits.data[i].commit.committer.date);

			if ( moment(time[i]).format("MMM Do YY") == moment().format("MMM Do YY") ){
				commitsToday += 1
			}
		}
	})
	.success(function() {
		$("#commits-today").append(commitsToday)

		for (var i = 0; i < 3; i++) {
			$("#commit-messages").append(messages[i] + " — " + getPrettyTime(time[i]) + "<br />");
		}
	})
}



function getPrettyTime (dirtyDate) {
	return moment(dirtyDate).fromNow();
}

function display (selector, data){
	for (i in data) {
		$(selector).append(data[i])
	}
}
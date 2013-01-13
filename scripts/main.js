
// In the format USER/REPO
TARGET = "tedlee/dash-hub"

window.onload = function feedMe() {

	$("#title").append(TARGET);
	callGitHub();

}

window.setInterval(function(){
	cleanUp();
	callGitHub();
}, 60000);

function cleanUp() {
	$("#commits-today").empty();
	$("#commits-weekly").empty();
	$("#commit-messages").empty();
}

function callGitHub() {
	
	console.log("In callGitHub");

	// Send the request
	var url =  "https://api.github.com/repos/" + TARGET + "/commits";
	var commitsToday = 0;
	var commitsWeekly = 0;
	var messages = [];
	var time = [];
	var now = moment();

	console.log(now.format("w"))
	
	$.getJSON(url + "?callback=?", null, function(commits) {

		for (i in commits.data){
			console.log(commits.data[i].commit.message);
			messages.push(commits.data[i].commit.message);
			time.push(commits.data[i].commit.committer.date);

			if ( moment(time[i]).format("MMM Do YY") == now.format("MMM Do YY") ){
				commitsToday += 1
			}

			if ( moment(time[i]).format("w") == now.format("w")){
				commitsWeekly +=1
			}

		}
	})
	.error(function() {
		$("commits-today").append("Couldn't communicate with GitHub. She's playing hard to get.");
	})
	.complete(function() {
		$("#commits-today").append("Commits Today: " + commitsToday);
		$("#commits-weekly").append("Commits this week: " + commitsWeekly);

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
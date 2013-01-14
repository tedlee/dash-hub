// In the format USER/REPO
TARGET = "tedlee/dash-hub"

window.onload = function feedMe() {

	$("#repoName").keyup(function(event){
	    if(event.keyCode == 13){
	        TARGET = $("#repoName").val();
	        callGitHub(TARGET);
	        console.log(TARGET);
	    }
	});

	callGitHub(TARGET);
}

window.setInterval(function(){
	callGitHub(TARGET);
}, 60000);

function cleanUp() {
	$("#commits-today").empty();
	$("#commits-weekly").empty();
	$("ul").empty();
}

function callGitHub(repo) {
	
	console.log("In callGitHub");

	// Send the request
	var url =  "https://api.github.com/repos/" + repo + "/commits";
	var commitsToday = 0;
	var commitsWeekly = 0;
	var messages = [];
	var time = [];
	var now = moment();
	
	$.getJSON(url + "?callback=?", null, function(commits) {
		for (i in commits.data){
			//console.log(commits.data[i].commit.message);
			messages.push(commits.data[i].commit.message);
			time.push(commits.data[i].commit.committer.date);

			if ( moment(time[i]).format("MMM Do YY") == now.format("MMM Do YY") ){
				commitsToday += 1
			};

			/*
			if ( moment(time[i]).format("w") == now.format("w")){
				commitsWeekly +=1
			};
			*/

		}
	})
	.error(function() {
		$("commits-today").append("Couldn't communicate with GitHub. She's playing hard to get.");
	})
	.complete(function() {
		cleanUp();
		$("#commits-today").append(commitsToday + " Commits Today");
		//$("#commits-weekly").append("Commits this week: " + commitsWeekly);

		for (var i = 0; i < 3; i++) {
			if (messages[i] != undefined) {
				$("ul").append("<li>" + messages[i] + " — <span class=\"commitTime\">" + getPrettyTime(time[i]) + ".</span></li>");
			}
			else {
				console.log("NO MORE COMMITS FOR YOU");
			} 
		};
	})
}

function updateRepo() {
	console.log("Trying to update repo")
}


function getPrettyTime (dirtyDate) {
	return moment(dirtyDate).fromNow();
}

function display (selector, data){
	for (i in data) {
		$(selector).append(data[i])
	}
}
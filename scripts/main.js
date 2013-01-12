
// In the format USER/REPO
TARGET = "mbostock/d3"

window.onload = function feedMe() {

	callGitHub();

}

function callGitHub() {
	
	console.log("In callGitHub");

	// Send the request
	var url =  "https://api.github.com/repos/" + TARGET + "/commits";
	$.getJSON(url, function(data) {
		var messages = [];

		for (var i = 0; i < 3; i++){
			messages.push(data[i].commit.message)
			console.log(messages[i])
			$("#commit-messages").append(messages[i] + "<br />");
		}


	});
}
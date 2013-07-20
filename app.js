var express = require('express');
var app = express();
var port = 1337;
app.use(express.bodyParser());
app.listen(port);
console.log('Express server started on port '+port);


// Show all commits
var commits = [];
app.get("/",function(request,response){
	var html = "<h3>Recent Commits:</h3><br>";
	for(var i=0;i<commits.length;i++){
		var commit = commits[i];
		html += commit.author.name+" pushed: <pre>"+commit.message+"</pre> at time <pre>"+commit.timestamp+"</pre>";
		html += "<br>";
	}
	response.send(html);
});

// Get commits
app.post("/github",function(request,response){

	// Secret
	if(request.query.secret!="secret"){
		console.log("Secret failed");
		response.end();
		return;
	}

	// Append commits
	var payload = request.body.payload;
	var newCommits = payload.commits;
	commits.push.apply(commits,newCommits);

	// Response
	response.send("success");

});
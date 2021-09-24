(function(){
	fetch("buildtime.txt").then(r=>r.text())
	.then(r=>console.log("BUILDTIME",r));
	fetch("buildsha.txt").then(r=>r.text())
	.then(r=>console.log("BUILDSHA",r));
})()

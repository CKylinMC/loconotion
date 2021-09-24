(function(){
	fetch("buildtime.txt").then(r=>r.text()).then(r=>console.log("BUILDTIME",r));
	fetch("buildsha.txt").then(r=>r.text()).then(r=>console.log("BUILDSHA",r));
	const pgtt=document.querySelector("meta[name='title']").content;if(document.title.indexOf(pgtt)===-1)if(document.title.toLowerCase()==="shadowkylin") document.title = pgtt;else document.title+=" | "+pgtt;
})()

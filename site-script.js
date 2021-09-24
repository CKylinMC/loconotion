(function(){
	const buildinfo = {buildtime:"0",buildsha:"?"};
	fetch("buildtime.txt").then(r=>r.text()).then(r=>showBuildInfo("t",r));
	fetch("buildsha.txt").then(r=>r.text()).then(r=>showBuildInfo("s",r));
	const pgtt=document.querySelector("meta[name='title']").content;if(document.title.indexOf(pgtt)===-1)if(document.title.toLowerCase()==="shadowkylin") document.title = pgtt;else document.title+=" | "+pgtt;
	const showBuildInfo = (type,resp)=>{
		if(type==="t") buildinfo.buildtime = resp;
		else if(type==="s") buildinfo.buildsha = resp;
		const old = document.querySelector("#wfsk-buildinfo");
		if(old) old.remove();
		const info = document.createElement("div");
		info.id = "wfsk-buildinfo";
		const body = document.querySelector(".notion-page-content");
		if(body)body.appendChild(info);
		info.style.width="100%";
		info.style.margin="20px auto";
		info.style.zIndex="999999";
		info.style.textAlign="center";
		info.style.color="#ffffff42";
		info.innerHTML = "ShadowKylin &copy; 2021<br>ShadowKylin是游戏Warframe全球服中的游戏公会，我们使用WFSK作为我们的简称。<br>该氏族和站点由CKylinMC建立<br>";
		if(buildinfo.buildtime==="0" || buildinfo.buildsha==="?") return console.log("Loading metadata...",type,resp,buildinfo);
		const time = new Date(parseInt(buildinfo.buildtime));
		const sha = buildinfo.buildsha.substring(0,7);
		const t = {
			y: time.getFullYear(),
			m: (time.getMonth()+1)>=10?time.getMonth()+1:"0"+(time.getMonth()+1),
			d: time.getDate(),
			h: (time.getHours()+1)>=10?time.getHours()+1:"0"+(time.getHours()+1),
			mi: (time.getMinutes()+1)>=10?time.getMinutes()+1:"0"+(time.getMinutes()+1),
			s: (time.getSeconds()+1)>=10?time.getSeconds()+1:"0"+(time.getSeconds()+1),
		};
		info.innerHTML+= `当前镜像上次构建于 ${t.y}-${t.m}-${t.d} ${t.h}:${t.mi}:${t.s} @ ${sha}`;
	}
})()

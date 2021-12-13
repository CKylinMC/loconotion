/**
 * site-script.js
 * @ver 1.2
 * @author CKylinMC
 * Sideload script for WFSK mirror site.
 */

(function () {
    /* Show Something Cooooool */

    (()=>{
        const consoleOpts = [
            "background:black;color:white;font-weight:bold;font-family:consolas,Arial,sans-serif;text-shadow:0 0 3px white;font-size: xx-large",
            "background:gray;color:black;font-weight:bold;font-family:consolas,Arial,sans-serif;text-shadow:0 0 3px red;font-size: xx-large",
            "background:transparent;color:#2196f3;font-weight:thin;font-family:consolas,Arial,sans-serif",
            "background: transparent;color:black;font-weight:bold;font-family:consolas,Arial,sans-serif;text-shadow:0 0 3px white",
            "background: transparent;color:#ff9800;font-weight:bold;font-family:consolas,Arial,sans-serif;font-size: large",
            "background: url(https://n9e5v4d8.ssl.hwcdn.net/images/global-nav/the-new-war/tnw-icon.png) no-repeat;font-size:xx-large",
            "font-size:x-large",
        ];
        const strs = "IF9fX18gIF8gICAgICAgICAgICAgICBfICAgICAgICAgICAgICAgXyAgX18gICAgIF8gXyAgICAgICA=.LyBfX198fCB8X18gICBfXyBfICBfX3wgfCBfX19fXyAgICAgIF98IHwvIC8gICBffCAoXylfIF9fICA=.XF9fXyBcfCAnXyBcIC8gX2AgfC8gX2AgfC8gXyBcIFwgL1wgLyAvICcgLyB8IHwgfCB8IHwgJ18gXCA=.IF9fXykgfCB8IHwgfCAoX3wgfCAoX3wgfCAoXykgXCBWICBWIC98IC4gXCB8X3wgfCB8IHwgfCB8IHw=.fF9fX18vfF98IHxffFxfXyxffFxfXyxffFxfX18vIFxfL1xfLyB8X3xcX1xfXywgfF98X3xffCB8X3w=.ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxfX18vICAgICAgICAgICA=".split(".");
        for(let str of strs) console.log(atob(str));
        console.log(
            "%c ShadowKylin %c 暗影麒麟 %c  镜像站点%c\nQQ 群: %c818581951\n%c   %cWarframe 国际服简中氏族",
            ...consoleOpts
        );
    })();

    /* Index Path Fix */
    if (location.pathname === "/shadowkylin.html") {
        history.replaceState('', {}, location.href.replace("/shadowkylin.html", "/"))
    }

    /* Footer Injecter - Init */
    const old = document.querySelector("#wfsk-buildinfo");
    if (old) old.remove();
    delete old;
    const info = document.createElement("div");
    info.id = "wfsk-buildinfo";
    const body = document.querySelector(".notion-page-content");
    if (body) body.appendChild(info);
    info.style.width = "100%";
    info.style.margin = "20px auto";
    info.style.zIndex = "999999";
    info.style.textAlign = "center";
    info.style.color = "#ffffff42";
    info.innerHTML = "ShadowKylin &copy; 2021<br>ShadowKylin是游戏Warframe全球服中的游戏公会，我们使用WFSK作为我们的简称。<br>该氏族和站点由CKylinMC建立<br>";
    const isp = document.createElement("span");
    isp.id = "wfsk-buildinfo-span"
    isp.innerHTML = "正在加载构建信息..."
    info.appendChild(isp);
    info.innerHTML += `<br><span onclick="location.href='/site.html'">[切换站点]</span><br><span id="busuanzi_container_site_pv">镜像站访问量<span id="busuanzi_value_site_pv">-</span>次</span><script async src="">
</script>`;

    /* Footer Injecter - ViewCounter */
    const bsz = document.createElement("script");
    bsz.setAttribute("async", "");
    bsz.src = "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
    info.appendChild(bsz);
    const targetImg = document.querySelector('img[src="793d36913121f91322d98e21024da07f9da05043.svg"]');/* Block original counter */
    if (targetImg) targetImg.style.display = "none";

    /* Footer Injecter - Title Replacer */
    document.title = document.title.replace(" | 镜像站", "") + " | 镜像站";
    const pgtt = document.querySelector("meta[name='title']").content; if (document.title.indexOf(pgtt) === -1) if (document.title.toLowerCase() === "shadowkylin") document.title = pgtt; else document.title += " | " + pgtt;

    /* Footer Injecter - BuildInfo */
    const buildinfo = { buildtime: "0", buildsha: "?" };
    const showBuildInfo = (type, resp) => {
        if (type === "t") buildinfo.buildtime = resp;
        else if (type === "s") buildinfo.buildsha = resp;
        if (buildinfo.buildtime === "0" || buildinfo.buildsha === "?") return console.log("Loading metadata...", type, resp, buildinfo);
        const time = new Date(parseInt(buildinfo.buildtime));
        const sha = buildinfo.buildsha.substring(0, 7);
        const t = {
            y: time.getFullYear(),
            m: (time.getMonth() + 1) >= 10 ? time.getMonth() + 1 : "0" + (time.getMonth() + 1),
            d: time.getDate(),
            h: time.getHours() >= 10 ? time.getHours() : "0" + time.getHours(),
            mi: time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes(),
            s: time.getSeconds() >= 10 ? time.getSeconds() : "0" + time.getSeconds(),
        };
        let isp = info.querySelector("span#wfsk-buildinfo-span");
        isp.innerHTML = `当前镜像上次构建于 ${t.y}-${t.m}-${t.d} ${t.h}:${t.mi}:${t.s} @ <span onclick="location.href='https://github.com/CKylinMC/loconotion/commit/${sha}'">${sha}</span>`;
    }
    fetch("buildtime.txt").then(r => r.text()).then(r => showBuildInfo("t", r));
    fetch("buildsha.txt").then(r => r.text()).then(r => showBuildInfo("s", r));

    /* PageOptimizer */
    switch (location.pathname) {
        case "/site.html": { document.body.innerHTML = document.body.innerHTML.replace("国内访问推荐", "<b style='color:gray'>当前访问</b>") } break;
        case "/":
        case "/shadowkylin.html": {
            if ((new URL(location.href)).searchParams.get("i") !== null) location.href = "#:~:text=%E5%A6%82%E6%9E%9C%E6%82%A8%E5%88%9D%E6%9D%A5%E4%B9%8D%E5%88%B0%EF%BC%8C%E8%AF%B7%E5%AE%B9%E6%88%91%E5%90%91%E6%82%A8%E4%BB%8B%E7%BB%8D%E4%B8%80%E4%B8%8BSK%E6%B0%8F%E6%97%8F~";
            if ((new URL(location.href)).searchParams.get("q") !== null) location.href = "#:~:text=818581951";
            let giscus = "";
            if ((new URL(location.href)).searchParams.get("giscus") !== null) giscus = "?giscus=" + (new URL(location.href)).searchParams.get("giscus");
            history.replaceState('', {}, location.pathname + giscus);
        } break;
    }

    /* Comments */
    const loadCommentsInto = (el) => {
        const cmt = document.createElement("div");
        const cmtstyle = document.createElement("style");
        cmtstyle.innerHTML = `
        #waline{
            --waline-border: 1px solid #6666664f;
            --waline-bgcolor: #2f3437;
            --waline-bgcolor-light: #282c2e;
            --waline-border-color: #333;
        }
        .vpower{
            opacity: 0;
        }
        `;
        cmt.appendChild(cmtstyle);
        const cmtcontainer = document.createElement("div");
        cmtcontainer.id = "waline";
        cmt.style.width = "100%";
        cmt.style.minWidth = "300px";
        cmt.style.maxWidth = "800px";
        cmt.style.margin = "0 auto";
        cmt.appendChild(cmtcontainer);
        const script = document.createElement("script");
        script.src = "//cdn.jsdelivr.net/npm/@waline/client";
        cmt.appendChild(script);
        script.onload = () => {
            Waline({
                el: '#waline',
                serverURL: 'https://comment.ckylin.site',
                dark: '#notion-app>div.notion-dark-theme'
            });
        }
        if (!el) {
            (document.querySelector("#wfsk-buildinfo").parentElement).insertBefore(cmt, document.querySelector("#wfsk-buildinfo"));
        } else {
            el.appendChild(cmt);
        }
    }
    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
        );
    }
    const regScrollCommentLoader = () => {
        window.jsLoaded = false;
        const scroller = document.querySelector(".notion-scroller");
        const bif = document.querySelector("#wfsk-buildinfo");
        if (!scroller) return;
        const scrollfn = debounce(() => {
            if (window.jsLoaded) return;
            if (isElementInViewport(bif)) {
                window.jsLoaded = true;
                scroller.removeEventListener("scroll", scrollfn);
                loadCommentsInto();
            }
        })
        scroller.addEventListener("scroll", scrollfn);
        scrollfn();
    }
    regScrollCommentLoader();

    // /* Screen Fix */
    // (() => {
    //     const emptyBlankDiv = document.querySelector(".notion-scroller>div.notion-presence-container").previousElementSibling.lastElementChild;
    //     if (emptyBlankDiv && !emptyBlankDiv.classList.contains("notion-scroller") && !emptyBlankDiv.classList.contains("notion-collection-view-body"))
    //         emptyBlankDiv.setAttribute("style", "width:0!important");
    // })();

    /* Toggle List Fix (Reregister) */
    (() => {
        const toggleButtons = document.getElementsByClassName("loconotion-toggle-button");
        for (let i = 0; i < toggleButtons.length; i++) {
            const toggleButton = toggleButtons.item(i);
            const toggleId = toggleButton.getAttribute("loconotion-toggle-id");
            const toggleContent = document.querySelector(`.loconotion-toggle-content[loconotion-toggle-id='${toggleId}']`);
            const toggleArrow = toggleButton.querySelector("svg");
            if (toggleButton && toggleContent) {
                hideToggle(toggleContent, toggleArrow);
                const toggleButtonI = toggleButton.cloneNode(true);
                const toggleArrowI = toggleButtonI.querySelector("svg");
                toggleButton.replaceWith(toggleButtonI);
                toggleButtonI.addEventListener("click", () => {
                    if (toggleContent.style.display == "none") {
                        showToggle(toggleContent, toggleArrowI);
                    } else {
                        hideToggle(toggleContent, toggleArrowI);
                    }
                });
            }
        }
    })();
})()


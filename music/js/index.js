    let NUMBER = 0; //加载的数据数量
    let isMore = true; //是否支持继续加载数据，即数据是否已经全部加载完成

    class Audio {
        constructor() {
            document.body.innerHTML += "<audio id='audio' controls><source src='' type='audio/mp3'></source></audio><br/><br/>";
            this.local = null;
            this.infoPage = null;
            this.ele = document.getElementById("infoPage");
            this.obj = document.getElementById("audio");
            this.type = "none";
            this.obj.style.display = "none";
            console.log("Audioplayer Object created.")
        }
        play(musicId) {
            console.log("Start loading layout:playScreen.")
            this.obj.style.display = "block";
            try {
                if (musicId == this.local) {
                    this.show();
                    return;
                }
                this.local = musicId;
                this.show();
                let info = data[musicId];

                function loadInfo() {
                    document.querySelector("#infoPage .title").innerHTML = data[musicId].title;
                    document.querySelector("#infoPage .text").innerHTML = data[musicId].text;
                }

                if (info.id) {

                    document.getElementById("audio").src = "https://music.163.com/song/media/outer/url?id=" + data[musicId].id;
                    document.getElementById("audio").play();
                    this.show();
                    this.type = "music";
                    loadInfo();
                    return true;
                }
                if (info.source) {
                    if (info.source.search("local:") != -1) {
                        //本地音乐文件
                        document.getElementById("audio").src = info.source.split('local:')[1];
                        document.getElementById("audio").play();
                        this.show();
                        this.type = "music";
                        loadInfo();
                        return true;
                    }
                    const ele = document.getElementById("iframe");
                    ele.src = info.source;
                    ele.style.display = "block";
                    this.obj.pause();
                    this.type = "source";
                    document.getElementById("iframeRadiu").style.display = "block";
                    loadInfo();
                    return true;
                }
            console.log("End loading layout:playerScreen.")
            } catch (er) {
                alert("Audio:播放前发生错误：" + er)
            }
        }
        show() {
            const ele = this.ele;
            document.getElementById("floatRadiu").style.display = "none";
            ele.style.backgroundImage = `url(${data[this.local].img})`;
            ele.style.top = "0";
        }
        back() {
            this.ele.style.top = "120vh";
            document.getElementById("floatRadiu").style.display = "block";

        }
    }
    const audio = new Audio();
    
    function hideAudio() {
        const e = audio.obj;
        e.style.bottom = "-30%";
        return true;
    }

    function displayAudio() {
        const e = audio.obj;
        e.style.bottom = "0";
        return true;
    }
    let lock = false; //audio控件是否升

    //shit山代码勿碰！
    let t = setTimeout(() => {
        lock = false;
        hideAudio();
    }, 5000000)
    document.body.onmouseover = () => {
        displayAudio();
        lock = true;

        if (t) {
            clearTimeout(t);
            t = setTimeout(() => {
                lock = false;
                hideAudio();
            }, 5000)
            return;
        }
    }


    //###随机化推荐实现代码：
    //创建一个储存data中的序列的有序数组
    let dataIndexs = new Array();
    //填充dataIndexs：
    for (let orderl = 0; orderl < data.length; ++orderl) {
        dataIndexs.push(orderl);
    }

    let randomList = new Array(); //创建随机数组
    const DATALENGTH = dataIndexs.length; //储存dataIndexs的长度
    //循环更新randomList内容
    while (randomList.length < DATALENGTH) {
        let random = Math.floor(100 * Math.random());
        if (typeof(dataIndexs[random]) != "undefined") {
            randomList.push(dataIndexs[random]);
            dataIndexs.splice(random, 1);
        }
    }

    function loadMore() {
        fillBlocks(20);
        //如果全部数据展示完成，关闭按钮显示状态。
        if (isMore == false) {
            document.getElementById("loadMore").style.display = "none";
            return false;
        }
        return true;
    }



    function fillBlocks(num) {
        let maxLen = (NUMBER + num) >= data.length ? data.length : NUMBER + num;
        for (let index = NUMBER; index < maxLen; ++index) {
            let obj = data[randomList[index]];
            if (obj.img == '') {
                obj.img = "https://tuchuang.voooe.cn/images/2023/01/24/65261833.jpg";
            }
            document.getElementById("content").innerHTML += `
                <div onclick="audio.play(${randomList[index]})" style="background-image: url(${obj.img});background-size: cover;background-position: center center;">
                <div class="cases">
                    <div class="title">${obj.title}</div>
                    <div class="description">${obj.text}</div>
                </div>
                </div>
                `
                ++NUMBER;
            if (maxLen == data.length) {
                //如果所有数据都罗列出时：
                isMore = false;
            }
        }
    }
    
    //全屏模式
    document.querySelector('HEADER').onclick = () => {
        if (document.documentElement.RequestFullScreen) {
            document.documentElement.RequestFullScreen();
        }
        //兼容火狐
        console.log(document.documentElement.mozRequestFullScreen)
        if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        }
        //兼容谷歌等可以webkitRequestFullScreen也可以webkitRequestFullscreen
        if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen();
        }
        //兼容IE,只能写msRequestFullscreen
        if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    }
let NUMBER = 0; //加载的数据数量
let isMore = true; //是否支持继续加载数据，即数据是否已经全部加载完成

class Audio {
    constructor() {
        document.body.innerHTML += "<audio id='audio' controls><source src='' type='audio/mp3'></source></audio><br/><br/>";
        this.local = null;
        this.infoPage = null;
        this.originalImgUrl = "https://pic.imgdb.cn/item/66706bb0d9c307b7e9069b74.jpg";
        this.ele = document.getElementById("infoPage");
        this.obj = document.getElementById("audio");
        this.type = "none";
        this.obj.style.display = "none";
        this.songUserData = {
            isLiked: null,
            isCleared: true
        }
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
                    //本地音乐文件播放
                    document.getElementById("audio").src = info.source.split('local:')[1];
                    document.getElementById("audio").play();
                    this.show();
                    this.type = "music";
                    loadInfo();
                    return true;
                }
                //163外部音乐链接播放
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
    displayAction(isDisplay) {
        //@描述： 音乐播放show()后，旁栏事件。
        if (isDisplay === true) {
            document.getElementById("actions").style.left = "0";
        } else {
            document.getElementById("actions").style.left = "-60px";
        }
        //客户端界面过渡动画


        //先检测是否喜欢，局部作用域：
        {
            let object = document.getElementsByName("like")[0];
            //是否被收藏
            if (System.like.indexOf(this.local) == -1) {
                this.songUserData.isLiked = false;
                //未被收藏后，like图标变灰白
                object.style.color = "#eee";
                object.className = "fa fa fa-heart-o";
            } else {
                //被收藏：
                this.songUserData.isLiked = true;
                object.style.color = "red";
                object.className = "fa fa-heart";
            }
            console.log("audio.songUserData.isLiked:" + this.songUserData.isLiked);
            //添加like点击事件：
            object.onclick = () => {
                this.action("like", this.songUserData.isLiked == true ? 0 : 1); //跳转到专用的action方法执行
            }
        }
        document.getElementsByName("clear")[0].onclick = () => {
            this.action("clear");
        }
        document.getElementsByName("download")[0].onclick=()=>{
            window.open(document.getElementById("audio").src);
        }

    }
    action(object, key) {
        /*
            参数：object必须   key必须 
            key:
            [Object = 'like']   0-取消喜欢 1-添加喜欢
        */
        try {

            if (object == "like") {
                audio.songUserData.isLike = !audio.songUserData.isLike;
                object = document.getElementsByName("like")[0];
                //替换现在不需要的变量以节省空间；object:Element对象
                if (key == 0) {
                    //取消喜欢：
                    object.style.color = "#eee";
                    object.className = "fa fa fa-heart-o";
                    System.like = System.like.filter((dataObject) => {
                        return dataObject != this.local;
                    })
                    window.localStorage.setItem("System", JSON.stringify(System));
                    this.displayAction(true);
                    return 0;
                }
                if (key == 1) {
                    //添加到喜欢
                    object.style.color = "red";
                    object.className = "fa fa fa-heart";
                    System.like.push(this.local);
                    window.localStorage.setItem("System", JSON.stringify(System));
                    this.displayAction(true);
                    return 1;
                }
            } else if (object == "clear") {
                //判断是否清屏
                let dts = [];
                dts.push(document.querySelector("#infoPage .tools"));
                dts.push(document.querySelector("#infoPage .title"));
                dts.push(document.querySelector("#infoPage .text"));
                
                console.log("是否清屏："+this.songUserData.isCleared)
                if (this.songUserData.isCleared === true) {
                    dts.forEach((ele, i) => {
                        ele.style.opacity = "0";
                    })
                    document.getElementsByName("clear")[0].className = "fa fa-square";
                }
                if (this.songUserData.isCleared === false) {
                    dts.forEach((ele, i) => {
                        ele.style.opacity = "1";
                    })
                    document.getElementsByName("clear")[0].className = "fa fa-square-o";
                }
                this.songUserData.isCleared = !this.songUserData.isCleared;
                return true;
            }
            return false;
        } catch (error) {
            alert("Addition:" + error);
        }
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



//警告：shit山代码勿碰！
let t = setTimeout(() => {
    lock = false;
    hideAudio();
    audio.displayAction(false);
}, 5000000)
document.body.onmouseover = () => {
    displayAudio();
    audio.displayAction(true);
    lock = true;

    if (t) {
        clearTimeout(t);
        t = setTimeout(() => {
            lock = false;
            audio.displayAction(false);
            hideAudio();
        }, 5000)
        return;
    }
}
//狮山代码结束



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
dataIndexs = null; //删除dataIndex以节省空间

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
            obj.img = audio.orginalImgUrl;
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


//检测用户localStorage信息并初始化
let System = null;
if (!window.localStorage.getItem("System")) {
    console.log("Setting localStorage...")
    System = {
        like: []
    }
    window.localStorage.setItem("System", JSON.stringify(System));
} else {
    System = JSON.parse(window.localStorage.getItem("System"));
}

function getIdByLink(){
    let musicId = window.location.search.split('?')[1]||false;
    if(musicId==false){
        return false;
    }
    setTimeout(()=>{
        audio.play(musicId);
        console.log("@getIdByLink():msuicId:"+musicId)
    },800)
    return true;
}
getIdByLink();


//全屏模式(Copied from website)[doge]
document.querySelector('HEADER').onclick = () => {
    if (document.documentElement.RequestFullScreen) {
        document.documentElement.RequestFullScreen();
    }
    //兼容火狐
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
//小接口：
			var locateId;//当前正在播放的音乐ID
			var thisId;//当前点开页面的Id
			var MUSICID;//This id;
			var loopPlayValue=0;//@loop under
			var CLEAR=0;
            var contentNum=16;//已经出现的容器数量

			var user={
			}
		//end

	var $=(ele)=>{
		if(document.querySelectorAll(ele).length===1)return document.querySelectorAll(ele)[0];
		return document.querySelectorAll(ele);
	}
	//容器构造器
	for(let i=0;i<data.length;++i){
		//var type=data[i].type.split(";");var len=type.length;console.log(len)
		    data[i].d=i;//LUCEL下的ID
            if(data[i].img==''){data[i].img="/public/background.jpg";}//content background link
			var bg="<div class='content' onclick='play("+i+")' style='background-image:url("+data[i].img+")'><div class='init'>";
			var title="<h3>"+data[i].title+"</h3>";
			var text="<div class='text244'>"+data[i].text+"</div></div>";
			$("#page").innerHTML+=bg+title+text;
            var n=contentNum-1;
            if(i==n){
                $("#page").innerHTML+="<div class='load-more-music' onclick='loadAll()'>加载更多</div>";
                n='';//delete
                break;
            }
	}
    var loadAll=()=>{
        $(".load-more-music").style.display="none";
        for(let i=contentNum;i<data.length;++i){
            data[i].d=i;
        if(data[i].img==''){data[i].img="/public/background.jpg";}
            var bg="<div class='content' onclick='play("+i+")' style='background-image:url("+data[i].img+")'><div class='init'>";
            var title="<h3>"+data[i].title+"</h3>";
            var text="<div class='text244'>"+data[i].text+"</div></div>";
            $("#page").innerHTML+=bg+title+text;
        }
        contentNum=data.length;
        return true;
    }

		//初始化；
			//data:
			var listen;
		//end

	//Cookie方法函数 return{...}
	var setCookie=(cname,cvalue,exdays)=>{
		//@prag: cname: 对象; cvalue: 值,exdays: 天；
		var d = new Date();
		d.setTime(d.getTime()+(exdays*365*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cname+"="+cvalue+"; "+expires;
	}
	var getCookie=(cname)=>{
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
	}
	return "";
	}
	var checkCookie=()=>{
		var _main=getCookie("_main");
		if (_main!=""){
			return true;
		}
		else {
			setCookie("_main","1",5);
			setCookie("music",'',5);
			setCookie("loopModel",'',5);
            return false;
		}
	}
	//@Cookie: 函数方法 end
	var addCookie=(type,value)=>{
		var d = new Date();
		d.setTime(d.getTime()+(3*365*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		if(type=="music"){
			var obj=getCookie("music");
			if(obj==''){
				var v=value+"&";
				setCookie("music",v,5)
			}else{
				var n=obj.split("&");
				var len=n.length;
				console.log('music.cookie.length:',len,"they are",document.cookie);
				for(let i=0;i<len;++i){
					if(n[i]==value){
						//n[...]每个由"&"分割的对象
						newMessage("已取消");
						$("#ilike").className="fa fa-heart-o";//更改图标
						var text=value+"&";
						//@para:Example:: when value=2=>text=2& ->replace 2&-->''to delete 
						setCookie("music",getCookie("music").replace(text,''),5);
						//Overwrite muisc data to new
						return;//end while and:结束
					}
					//检测是否已经被添加
				}
				//开始添加至"ilike"
				var newData = getCookie("music")+value+"&";
				setCookie("music",newData,5);
				$("#ilike").className="fa fa-heart";
				return  getCookie("music");
			}
		}
		return "$LUCEL: Cannot Find in:addCookie. Error Function Data: addCookie()";
	}

	var loopPlay=()=>{
		if(loopPlayValue==0||loopPlayValue=='0'){
			$("#music").loop=true;
			loopPlayValue=1;
			$("#playSet").className="fa fa-refresh";
			setCookie("loopModel",'1',5);
			return true;
		}else{
			$("#music").loop=false;
			loopPlayValue=0;
			$("#playSet").className="fa fa-sort-amount-asc";
			setCookie("loopModel",'0',5);
			return false;
		}
	}
	
    if(!getCookie("loopModel")==''){loopPlayValue=getCookie("loopModel");loopPlay();loopPlay();};

	var play=(n)=>{
			if(($("#music").src)!=("https://music.163.com/song/media/outer/url?id="+data[n].id))
			{
				listen();
				if(data[n].id){
					$("#music").src="https://music.163.com/song/media/outer/url?id="+data[n].id;
				}else if(data[n].mid){
					$("#music").src=data[n].mid;
				}else{
                    $("#ifr").style.display="block";
                    $("#ifr").src=data[n].source;
                    $("#music").pause();
                    playerDisplay(n);
			        $("#listenContent").style.visibility="hidden";
                    $("#returnIfr").style.display="block";
                    return;
                }
			}
			$("#music").play();
			playerDisplay(n);
			$("#listenContent").style.visibility="hidden";//隐藏音乐浮动图标
			//Version 1.3.x: cannot found num and it has a bug so delete it .replace to "num->contentNum"
            for(let i=0;i<contentNum;++i){
				document.getElementsByClassName("init")[i].style="rgb(255,255,255,0.5);top: 0;";
			}
            document.getElementsByClassName("init")[n].style="background: rgb(255,255,255,0.7);top: 70%;";
			
            return locateId=n;
		}

		var listen=()=>{
			var t,f;
			$("#music").onloadstart=()=>{
				f=1;
			}
			$("#music").onprogress=loading(0);
			$("#music").oncanplay=()=>f=0;removeLoading(0);
			var t=setTimeout(()=>{
				if(f==1)loading(1);f=0;removeLoading(0);
			},20000)
		}

		var playerDisplay=(i)=>{
			//@  i: data序列
			$("#player").style.backgroundImage="url("+data[i].img+")";
			$("#player").style.top=0;
			$("#boardMusicTitle").innerHTML=data[i].title;
			$("#playerInner").innerHTML="&nbsp &nbsp &nbsp"+data[i].text;

			var n=getCookie("music").split("&");
				var len=n.length;
				console.log('music.cookie.length:',len)
				for(let v=0;v<len;++v){
					if(n[v]==data[i].d){
						$("#ilike").className="fa fa-heart";
						$("#playerBG").style.opacity="1";
						$("#boardMusicTitle").style.opacity="1";
						break;
					}
				}
			thisId=i;
			MUSICID=data[i].d;
			return true;
		}
        
        //欣赏图片的背景
		var clearScreenTexts=()=>{
			if(CLEAR==0){
				$("#playerBG").style.opacity="0";
				$("#boardMusicTitle").style.opacity="0";
				$("clearTexts").className="fa fa-circle-thin";

                $("#ilike").style.opacity="0";
                $("#playSet").style.opacity="0";
                $("#music").style.opacity="0";
				CLEAR=1;
				return true;
			}else{
				$("#playerBG").style.opacity="1";
				$("#boardMusicTitle").style.opacity="1";
				$("clearTexts").className="fa fa-minus";

                $("#ilike").style.opacity="1";
                $("#playSet").style.opacity="1";
                $("#music").style.opacity="1";
				CLEAR=0;
				return false;
			}
		};

		//返回按钮 => 关荧幕
		let back=(obj)=>{
			if(obj=="playerScreen"){
				$("#player").style.top="160vh";
				$("#listenContent").style.visibility="visible";

				$("#ilike").className="fa fa-heart-o";
				return true;
			}else if(obj=="ifr"){
                $("#returnIfr").style.display="none";
                $("#ifr").style.display="none";
                return back("playerScreen");
            }
		}
        let audioDisplayFunc=()=>{
            let ele=$("#music").style.opacity;
            if(ele=="1")ele="0";
            if(ele=="0")ele="1";
            return true;
        }
		$("#listenContent").onclick=()=>{
			$("#listenContent").style.visibility="hidden";
			playerDisplay(locateId);
		}
	
	//独立区间	{
	var loadingBox=document.createElement("div");
		loadingBox.className="little-float-model-box";
		loadingBox.innerHTML="<h4 class='c-text'>加载中...</h4><div class='space'><button class='common-button' onclick='cancelLocateMusic()'>取消</button></div>";
	var cannotLoadMusic=document.createElement("div");
		cannotLoadMusic.className="little-float-model-box";
		cannotLoadMusic.innerHTML="<h4>加载失败：超时</h4><div>但我们会试图继续努力加载</div><button onclick='removeLoading(1)' class='full-button'>确认</button>"
		
	var element=document.body; 
	var loading=(i)=>{
		if(i==0)element.appendChild(loadingBox);
		if(i==1)element.appendChild(cannotLoadMusic);
	}
	
	var removeLoading=(i)=>{
		if(i==0){element.removeChild(loadingBox);}
		else if(i==1){element.removeChild(cannotLoadMusic)};

	}
		var messageBox=document.createElement("div");
			messageBox.className="little-float-model-box";
			messageBox.innerHTML="";
	var newMessage=(msg)=>{
		messageBox.innerHTML=msg;
		element.appendChild(messageBox);
		setTimeout(()=>{
			element.removeChild(messageBox);
			messageBox.innerHTML="";
		},3000)
	}
	
	//end	}
	var cancelLocateMusic=()=>{
		$("#music").src="";
		removeLoading(0);
	}

	const num=document.getElementsByClassName("init").length;//@play using;
	//Devlopper Useing Function
		var clearCookie=()=>{
			var d = new Date();
			d.setTime(d.getTime()+(1*-365*24*60*60*1000));
			var expires = "expires="+d.toGMTString();
			document.cookie = expires;
		}

	//Pack Func 执行区域：
	checkCookie();
	setTimeout(()=>{
		if(getCookie("_main")){newMessage("Cookie已保存至本地")}
	},2000);
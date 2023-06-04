		var picture=document.getElementById("picture");
		var loadPicture=document.getElementById("loadPicture");
		var loadValue=document.getElementById("loading");
		var audio=document.getElementById("audio");
		var newSrc=audio.src;
		var msgbox=document.getElementById("msgbox");
		var num;var page=2; //两者分别为音乐，图片 图片默认值:2
		console.log("ready");
		setTimeout(function(){
			loadValue.style.width="12%";
			document.getElementsByClassName("player")[0].style.opacity="0";
		},1500)
		setTimeout(function(){
			loadValue.style.width="32%";
				console.log("$loading.value=1\n||进度条加载");
				picture.style.backgroundImage="url(pictures/main.jpg)";
		},4600)	
		setTimeout(function(){
			loadValue.style.width="85%";
				picture.style.zIndex="5";
				msgbox.style.display="block";
				nextPicture.style.zIndex="3";
		},5600)
		setTimeout(function(){
			loadValue.style.width="99%";
			audio.src = newSrc;
			console.log(audio.src);
			document.getElementById("blackBar").style.display="block";
		},8000)
		
		//优化加载，异步处理，获得良好体验
	//------异步编程-------js执行8秒后加载新的背景图片，
		//以便用户之后能快速获得新一轮图片↓
	
		//还是不太好，得继续优化	
		/*var information = '{"main":['+
			'{"title":"星空","text":"繁星闪烁，宁静祥和。"} ]}';
		inf = JSON.parse(information);
		var n;
		var pages = document.cookie = "page=1;sexpires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";
		document.getElementById("text").innerHTML = "<h3>" + inf.main[0].title + "</h3>" +inf.main[0].text;
	注： ---------描述文字*/
		var toolBar = document.getElementById("toolBar").style;
		
		var getToolBar=0;
		picture.onclick=function(){
			console.log("|||User Clicked.");
			toolBar.opacity="0.8";
			toolBar.top="0";
			getToolBar=1;
			setTimeout(function(){
				toolBar.opacity="0";
				toolBar.top="-20%";
				$("toLeft").style="opacity: 0";
				$("toRight").style="opacity: 0";
			},6500)
			$("toLeft").style="opacity: 0.8";
			$("toRight").style="opacity: 0.8";
		}
		//点击图片的操作
		
		//音乐播放
		//控制音乐的函数 num表示曲目序号
		function music(num){
            console.log("Music Loading.",audio.src);
			document.getElementById("audio").src=amusic[num];
            return true;
		}
		let iL=-1;
		function loadForImg(){
			setTimeout(function(){
				if(iL<img.length){
					loadPicture.style.backgroundImage="url("+img[iL]+")";
					console.log("Loaded Picture Function  ,",loadPicture.style.backgroundImage);
					loadForImg();
				}
			},6000)
			return ++iL;
		}
		
		loadForImg();
		
		var imgValue=0;
		function show(){
			picture.style.backgroundImage="url("+img[imgValue]+")";	
			console.log(imgValue,picture.style.backgroundImage);
			return ++imgValue;
		}
		
		
		var noneUrl="https://player.bilibili.com/player.html?aid=80433022&bvid=BV1GJ411x7h7&cid=137649199&page=1";
		//你被骗了		
	

		function before(){
			imgValue-=2;
			return show();	
		}
		var getNoneValue=0;
		function none(){
			document.getElementById("none").src=noneUrl;
			document.getElementById("none").style.display="block";
			if(getNoneValue==1){
				document.getElementById("none").src="";
				document.getElementById("none").style.display="none";
				document.getElementById("returnNonePage").style.display="none";
				getNoneValue=0;
			}
			else{
				getNoneValue=1;
				document.getElementById("returnNonePage").style.display="block";
			}
		}

		function $(id){return document.getElementById(id);}


		function getMusic(){
			document.getElementById('music-choose').style.top='20%';document.getElementById('music-choose').style.opacity='0.8';
			document.getElementsByClassName("player")[0].style.opacity="1";
		}
		function returnMusicMenu(){
			document.getElementById('music-choose').style.top="-100%";
			document.getElementById('music-choose').style.opacity="0";
		}

		$("pageOn").onmouseover=function(){
			$("toLeft").style="opacity: 1";
			$("toRight").style="opacity: 1";
		}
		$("pageOn").onmouseout=function(){
			$("toLeft").style="opacity: 0";
			$("toRight").style="opacity: 0";
		}

		/*
		function setCookie(cname,cvalue,exdays) { 
			var d = new Date(); d.setTime(d.getTime()+(exdays*24*60*60*1000)); 
			var expires = "expires="+d.toGMTString();
			document.cookie = cname + "=" + cvalue + "; " + expires; 
			console.log("设置cookie");
		}
		
		function getCookie(cname) { 
			var name = cname + "="; 
			var ca = document.cookie.split(';'); 
			console.log("获取cookie");
			for(var i=0; i<ca.length; i++) { 
				var c = ca[i].trim(); 
				if (c.indexOf(name)==0) return c.substring(name.length,c.length);
			} 
			
			return ""; 
		}
		function checkCookie() { 
			console.log("检查cookie");
			var username=getCookie("username");
			if (username!="") { 
				alert("Welcome again " + username); 
			} else {
				username = prompt("Please enter your name:",""); 
				if (username!="" && username!=null) { 
					setCookie("username",username,365); 
					} 
				}
			}
		*/
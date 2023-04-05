let t;
function playerFunc(){
    try{
        let tt;
        let e=document.getElementById("audio");
        document.getElementById("audio").ontimeupdate=()=>{
            let timer=document.getElementById("timer");
            
            let ts=Math.floor(e.currentTime);
            let min = Math.floor(ts/60);
            min = min.toString().length < 2 ? min = "0" + min : min ;
            let s = Math.floor(ts%60);
            s = s.toString().length < 2 ? s = "0" + s : s ;
            timer.innerHTML=min+":"+s;     
            
            document.getElementById("progress").style.width = 100*ts/tt + "%";
        }
        document.getElementById("audio").oncanplay=()=>{
            tt = e.duration;
            let min = Math.floor(tt/60);
            min = min.toString().length < 2 ? min = "0" + min : min ;
            let s = Math.floor(tt%60);
            s = s.toString().length < 2 ? s = "0" + s : s ;
            document.getElementById("totalTimer").innerHTML=min+":"+s;
        }
    }catch(err){
        alert("Audio错误："+err);
    }
}
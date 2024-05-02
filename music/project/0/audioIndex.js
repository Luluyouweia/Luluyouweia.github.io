const audioElement = document.getElementById("audioObject");
//Creat Audio Object

const audioContext = new(window.AudioContext||window.webkitAudioContent);
//Get ACO

class AudioObject{
	constructor(bpm){
       /*
        BPM:乐曲速度 BPM个拍子/min
       */
   		this.source = audioContext.createMediaElementSource(audioElement);
        //construct an audioElementSource(AS) as As to play music
        this.bpm=bpm;
        //this.vol = audioContext.createGain();
        //this.vol.connect(audioContext.destination);
        //this.vol.gain.value = 0.6;
    }
    createOs(Val,T,start){
        let vol = audioContext.createGain();
        vol.connect(audioContext.destination);
        vol.gain.value = 0.03;
        
        //Val:音调频率(Hz) T：拍子百分化 (bmpT)
        let os = audioContext.createOscillator();
        let violin = audioContext.createOscillator();
        os.frequency.setValueAtTime(Val,start);
        violin.frequency.setValueAtTime(Val,start);
        os.type = 'sawtooth';
        //violin.type="square";
        os.connect(vol); 
        violin.connect(vol);
        os.start(audioContext.currentTime+start);
        //violin.start(audioContext.currentTime+start);
        vol.gain.linearRampToValueAtTime(0.3,audioContext.currentTime+start+0)
        //alert(start+T)
        os.stop(audioContext.currentTime+start+T*60/this.bpm);
        //violin.stop(audioContext.currentTime+start+T*60/this.bpm);
        vol.gain.exponentialRampToValueAtTime(0.03 ,audioContext.currentTime+ start + T*60/this.bpm)
        
    }
    anysData(data){
        /* 用于合成音频流
            [[{bpm:排数,osid:音调值,T:拍子},]]
            结构：[
                     [{osid,t...},{...}],
                     [],[]
                 ]
        */
        const len = data.length;//音调长度
        let currentTime=0;//初始化时间进度
        for(let i=0;i<data.length;++i){
            for(let a=0;a<data[i].length;++a){
                //setTimeout((i,a)=>{
                    //延时：当前排数级。将i,a参数传给函数后执行一下程序
                        let d=data[i][a];//解析对象
                        this.createOs(d.osVal,d.T,i*60/this.bpm);      
               // },i*60/this.bpm,i,a)
            }
            
        }
    }
}
    
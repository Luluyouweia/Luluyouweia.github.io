const piano = document.getElementById("piano");
const num=21;
for(let i=0;i<num;++i){
    piano.innerHTML+=`
        <div class="item-white" style="width:${100/num}%;color:rgb(0,0,0,0)" ontouchstart="addPart(0,${i});this.style.opacity='0.6'" ontouchend="this.style.opacity='1'">${(i)%7+1}</div>
    `
    if((i+1-parseInt((i)/7)*7)!=3&&(i+1-parseInt((i)/7)*7)!=7){
        piano.innerHTML+=`
            <div class="item-black" style="width:${50/num}%;left:${(i*100/num)+75/num}%;height: 45%;"></div>
        `
    }
}

let dts=[]
const osId=[220,246,261,294,330,349,391,440,493,523,587,659,698,783,880,986,1046,1174,1318,1396,1567]
function addPart(type,index){
    if(type==0){
        audio.createOs(osId[index],1,0)
        dts.push([{osVal:osId[index],T:1}])
    }
    //alert(JSON.stringify(dts))
}
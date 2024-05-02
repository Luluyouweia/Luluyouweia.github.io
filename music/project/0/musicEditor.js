for(let i=0;i<7;++i){
    document.querySelector("#ids").innerHTML+=`<span onclick="inputData(${i})">${1+i}</span>`
}
for(let i=-2;i<3;++i){
    document.getElementById("musicData").innerHTML+=`
        <input type="radio" name="bpmType" value=${i} onclick='setBpmType(${i+3})'>${i}级</input>
    `
}
//作曲界面UI
let typeVal= -1;
let addLine=(x)=>{
    document.getElementById("editorLine").style.bottom="0";
    
}

function inputData(index){
    ++index;
    console.log("类型："+typeVal+" "+index)
    document.getElementById("musicInformation").querySelector(".line").innerHTML+=`
        <span class="s${typeVal}">${index}</span>
    `
}

function setBpmType(index){
    typeVal = index;
}
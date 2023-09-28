NUMBER = 0;
try{
/*
const data = [
    {
        id: 0,title: "示例",text: "none",img:"./img/jpg"...
]
*/
function load(num){
  try{
    const n=data.length;
    let indexCallback = 0;
     //###随机化推荐实现代码：
     //创建一个储存data中的序列的有序数组
     let dataIndexs = new Array();
     //填充dataIndexs：
          for(let orderl=0;orderl<data.length;++orderl){
               dataIndexs.push(orderl);
          }
     let randomList = new Array();//创建随机数组
     const DATALENGTH = dataIndexs.length;//储存dataIndexs的长度
     //循环更新randomList内容
         while(randomList.length<DATALENGTH){
            let random = Math.floor(100*Math.random());
            if(typeof(dataIndexs[random])!="undefined"){
                randomList.push(dataIndexs[random]);
                dataIndexs.splice(random,1);
            }
    }
    alert(randomList+"\n\n"+randomList[0])
    function fillBlocks(num){
    for(let index=NUMBER;index<NUMBER+num;++index){
        let obj=data[randomList[index]];
        if(obj.img==''){
            obj.img="https://tuchuang.voooe.cn/images/2023/01/24/65261833.jpg";
        }
        document.getElementById("content").innerHTML += `
            <div onclick="audio.play(${index})" style="background-image: url(${data[index].img});background-size: cover;background-position: center center;">
                <div class="cases">
                    <div class="title">${obj.title}</div>
                    <div class="description">${obj.text}</div>
                </div>
            </div>
            `
    }
        NUMBER++;
  }
  fillBlocks(30);
  }catch(err){
    if(err=='break')return true;
    if(err=="ReferenceError: data is not defined")return alert("服务器连接失败。");
    alert("未知错误发生在 index.js 中的load():\n"+err)
    return false;
  }
}


}catch(e){
    alert("未知错误:"+e);
}
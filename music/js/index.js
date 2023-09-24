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
    let n=num;
    for(let i=0;i<n;++i){
        let index = i;//0924更新接口
        let random = Math.floor(100*Math.random());
        alert(random)
        if(data.img==""){
            if(random>=30)return data.img="https://tuchuang.voooe.cn/images/2023/01/24/65261833.jpg";
            data.img="https://pic.imgdb.cn/item/650c73cac458853aeff7d50a.png"
        }
        document.getElementById("content").innerHTML += `
            <div onclick="audio.play(${index})" style="background-image: url(${data.img});background-size: cover;background-position: center center;">
                <div class="cases">
                    <div class="title">${data.title}</div>
                    <div class="description">${data.text}</div>
                </div>
            </div>
            `
    }
        NUMBER++;
    
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
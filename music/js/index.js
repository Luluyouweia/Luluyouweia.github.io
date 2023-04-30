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
    data.forEach((data,index)=>{
        if(data.img==""){
            data.img="https://tuchuang.voooe.cn/images/2023/01/24/65261833.jpg";
        }
        document.getElementById("content").innerHTML += `
            <div onclick="audio.play(${index})" style="background-image: url(${data.img});background-size: cover;background-position: center bottom;">
                <div class="cases">
                    <div class="title">${data.title}</div>
                    <div class="description">${data.text}</div>
                </div>
            </div>
        `
        n--;
        NUMBER++;
        if(n<=0)throw 'break';
    })
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
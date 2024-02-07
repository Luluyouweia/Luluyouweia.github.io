setInterval(()=>{
    let d=new Date();
    let h=d.getHours().toString();
    let m=d.getMinutes().toString();
    let s=d.getSeconds().toString();
    
    if(h.length<2)h="0"+h;
    if(m.length<2)m="0"+m;
    if(s.length<2)s="0"+s;
        document.getElementById("h").innerText=h;
        document.getElementById("m").innerText=m;
        document.getElementById("s").innerText=s;
        document.getElementById("date").innerText=d.toLocaleDateString();
},500)
const MODEL={
    createPage(left,top,width,height,title,inner,id){
        let Inner=`
            <section class="ModelBox" style="top:${top};left:${left};width:${width};height:${height};">
                <span style="color: rgb(0,0,0,0.28);position: absolute;right: 10px;top: 7px;" onclick="document.body.removeChild(this.parentNode.parentNode)">x</span>
                <div title="${title}" style="font-size: 95%">${title}</div>
                <section>${inner}</section>
            </section>
        `
        let Element=document.createElement("section");
        Element.innerHTML=Inner;
        document.body.appendChild(Element);
        return true;
    },
    msgbox(content,type){
        let Inner=`
            <section class="ModelBox" style="top:0;bottom: 0;left: 0;right: 0;margin: auto;width:75%;max-height: 60vh;border-radius: 12px;">
                <span style="color: rgb(0,0,0,0.28);position: absolute;right: 10px;top: 7px;" onclick="document.body.removeChild(this.parentNode.parentNode)">x</span>
                <div title="对话框" style="font-size: 95%">提示</div>
                <section style="overflow: auto;">${content}</section>
            </section>
        `
        let Element=document.createElement("section");
        Element.innerHTML=Inner;
        document.body.appendChild(Element);
        return true;
    }
}
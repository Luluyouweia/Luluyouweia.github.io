import tkinter as tk

doc = tk.Tk()
doc.title("陆科系统")
doc.geometry("600x480")

#全局变量初始化区域：
inputText = tk.StringVar()#输入的数据
outputText = tk.StringVar()

consoleLog = tk.Label(doc,text="",font=('Arial',20),fg="#0088ff")

def submitData():
    outputText = inputText.get()#将输入值赋给outputText
    mainFunc()

def mainFunc():
    '''
    for index in range(4):
        outputText=outputText+outputText
    ''' 
    consoleLog.config(text=outputText)

    
tk.Label(doc,text="欢迎使用Python系统",font=('Arial',15),fg="#0088ff",bg="#eeeeee").pack()
tk.Entry(doc,textvariable=inputText,bg="#99ccff",width="300").pack()
tk.Button(doc,text="提交",font=('Arial',12),fg="#ffffff",bg="#0088ff",relief="solid",command=submitData).pack()

consoleLog.pack()
doc.mainloop()

import threading
import time
import random
import pandas as pd
import pyautogui
import pyperclip
from tkinter import filedialog, Tk, Label, Entry, Button, StringVar
from pynput import mouse, keyboard

class App:
    def __init__(self, root):
        self.root = root
        self.root.title("midjourney自动产出器")
        self.root.geometry("{}x{}".format(self.root.winfo_screenwidth()//2, self.root.winfo_screenheight()//2))  # Set to half of the screen size
        
        self.excel_path = StringVar()
        self.wait_time_after_enter_start = StringVar()
        self.wait_time_after_enter_end = StringVar()
        self.wait_time_after_paste = StringVar()
        self.cmd_sum = StringVar()
        self.wait_time_after_onece_start = StringVar()
        self.wait_time_after_onece_end = StringVar()
        self.click_position = None
        self.start_excel=StringVar()
        self.end_excel=StringVar()

        self.listener = None
        self.running = False

        Label(root, text="Excel路径").grid(row=0)
#         Label(root, text="发送命令随机间隔（秒）【推荐100-200】从").grid(row=1, sticky='e')
#         Label(root, text="到").grid(row=1, column=2) 
#         Label(root, text="粘贴后等待时间（秒）【推荐2】").grid(row=2, sticky='e')
#         Label(root, text="一轮发几条【推荐10】").grid(row=3, sticky='e')
#         Label(root, text="每轮等待随机间隔（秒）【推荐120-300】从").grid(row=4, sticky='e')
#         Label(root, text="到").grid(row=4, column=2) 
        Label(root, text="Excel起始位置").grid(row=1)
        Label(root, text="Excel结束位置").grid(row=2)
        
        Entry(root, textvariable=self.excel_path, width=10).grid(row=0, column=1, sticky='w')  # Modified
#         Entry(root, textvariable=self.wait_time_after_enter_start, width=10).grid(row=1, column=1, sticky='w')  # Modified
#         Entry(root, textvariable=self.wait_time_after_enter_end, width=10).grid(row=1, column=3, sticky='w')  # Modified
#         Entry(root, textvariable=self.wait_time_after_paste, width=10).grid(row=2, column=1, sticky='w')  # Modified
#         Entry(root, textvariable=self.cmd_sum, width=10).grid(row=3, column=1, sticky='w')  # Modified
#         Entry(root, textvariable=self.wait_time_after_onece_start, width=10).grid(row=4, column=1, sticky='w')  # Modified
#         Entry(root, textvariable=self.wait_time_after_onece_end, width=10).grid(row=4, column=3, sticky='w')  # Modified
        Entry(root, textvariable=self.start_excel,width=5).grid(row=1,column=1,sticky='w')
        Entry(root, textvariable=self.end_excel,width=5).grid(row=2,column=1,sticky='w')
        
        Button(root, text="浏览", command=self.browse_file).grid(row=0, column=2)
        self.start_button = Button(root, text="开始", command=self.start)
        self.start_button.grid(row=1, column=1)
        self.stop_button = Button(root, text="停止", command=self.stop)  # 创建停止按钮并使其处于禁用状态
        self.stop_button.grid(row=2, column=1)  # 在 GUI 中添加停止按钮
        self.set_position_button = Button(root, text="确定鼠标位置", command=self.set_click_position)
        self.set_position_button.grid(row=3, column=1)

    def browse_file(self):
        self.excel_path.set(filedialog.askopenfilename())

    def set_click_position(self):
        self.set_position_button.config(text="请点击任意位置")
        self.root.config(cursor="cross")
        self.listener = mouse.Listener(on_click=self.on_click)
        self.listener.start()

    def on_click(self, x, y, button, pressed):
        if button== mouse.Button.left and pressed:
            self.click_position = (x, y)
            self.listener.stop()
            self.set_position_button.config(text="确定鼠标位置")
            self.root.config(cursor="")

    def start(self):
        self.running = True
        self.start_button.config(state="disabled")
        self.stop_button.config(state="normal")  # 停止按钮被启用
        keyboard_listener = keyboard.Listener(on_press=self.on_key_press)
        keyboard_listener.start()

        threading.Thread(target=self.run).start()  # create a new thread to run the loop

    def run(self):
        df = pd.read_excel(self.excel_path.get(), header=0, usecols=[0])
        df.columns=['prompt']# read the first row as data
       # print(self.start_pos.get())
        
        if self.start_excel.get()!=None:
            start_excel=df[df['prompt'].str.contains(self.start_excel.get())].index[0]
        else:
            start_excel=-1
        if self.end_excel.get()!=None:
            end_excel=df[df['prompt'].str.contains(self.end_excel.get())].index[0]
        else:
            end_excel=len(df)
        df=df[start_excel+1:end_excel+1]
        #print(df)
        
        wait_time_after_enter_start = 5
        wait_time_after_enter_end = 10
        wait_time_after_paste = 2
        #cmd_sum = int(self.cmd_sum.get())
        wait_time_after_onece_start = 60
        wait_time_after_onece_end = 120
#         pyperclip.copy('start')
#         if self.click_position:
#             pyautogui.click(self.click_position)
#         else:
#             pyautogui.click()
        
#         pyautogui.hotkey('ctrl', 'v')
#         pyautogui.press('enter')

        try:
            for i, row in df.iterrows():
                
                if not self.running:
                    break
                for cell in row:
                    print(cell)
                    pyperclip.copy(str(cell))  # copy the data to the clipboard
                    if self.click_position:
                        pyautogui.click(self.click_position)
                    else:
                        pyautogui.click()
                    pyautogui.hotkey('ctrl', 'v')
                    time.sleep(wait_time_after_paste)
                    pyautogui.press('enter')
                    
                    #with open(r"C:\Users\yvonn\auto-midjourney\down.txt", "a") as myfile: myfile.write(str(cell))
                    
                    time.sleep(random.randint(wait_time_after_enter_start, wait_time_after_enter_end))
                    pyautogui.press('enter')

                if (i + 1) % cmd_sum == 0:
                    time.sleep(random.randint(wait_time_after_onece_start, wait_time_after_onece_end))  # wait for a random time
        finally:
            self.running = False
            self.start_button.config(state="normal")
            self.stop_button.config(state="disabled")  # 停止按钮被禁用

            
            
    def stop(self):
        self.running = False

    def on_key_press(self, key):
        if key == keyboard.Key.esc:
            self.stop()  # 如果按下 ESC 键，调用停止方法

root = Tk()
app = App(root)
root.mainloop()


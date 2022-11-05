// --------------------------点击导航栏切换tab页---------------------
var tablist = document.querySelectorAll(".tabBtn");
var tabboxes = document.querySelectorAll(".tab");
for (let i = 0; i < tablist.length; i++) {
  tablist[i].onclick = function () {
    // 遍历取消按钮样式，使tab页不显示    
    for (let j = 0; j < tabboxes.length; j++) {
      tabboxes[j].style.display = "none";
      tablist[j].removeAttribute("class");
    }
    //使选中页显示，为选中按钮加样式
    tabboxes[i].style.display = "block";
    tablist[i].setAttribute("class","active");
  };
}

// ------------------------tab1--------判断计时模式-----------------------------------------------
let countCheck = document.getElementById('count_Check');
let countdownCheck = document.getElementById('countdown_Check');

// -------------------------点计时按钮切换计时/暂停---------------------------------
let countId;
let countBtn = document.getElementById('count_Btn');

//计算累计毫秒数
function GetSumSeconds(){
    let s1 = parseInt(document.getElementById('s1').innerHTML);
    let s2 = parseInt(document.getElementById('s2').innerHTML);
    let m2 = parseInt(document.getElementById('m2').innerHTML);
    let m1 = parseInt(document.getElementById('m1').innerHTML);
    let sumseconds = 60 * (10 * m1 + m2) + (10 * s1 + s2);
    console.log(sumseconds);
    return sumseconds;
}
function CountTime(){
    // 获取计时器当前累计毫秒数
    let sumseconds = GetSumSeconds();
    if(countCheck.checked){
        //最多计时60分钟  
        if(sumseconds >= 3600){
            StopTime();
            console.log("最多计时60分钟！");
            return;
        }
        sumseconds ++;  
    }
    if(countdownCheck.checked){
        //最多计时60分钟  
        if(sumseconds <= 0){
            StopTime();
            console.log("倒计时结束！");
            return;
        }
        sumseconds --;  
    }
    //计算各位显示值
    document.getElementById('s2').innerHTML = sumseconds % 10;
    document.getElementById('s1').innerHTML = parseInt(sumseconds % 60 / 10);
    document.getElementById('m2').innerHTML = parseInt(sumseconds / 60 % 10);
    document.getElementById('m1').innerHTML = parseInt(sumseconds / 60 / 10);
}
function StopTime(){
    clearInterval(countId);
    countId = null;
}

//点击切换计时/暂停，用countId是否为空判断定时器状态
countBtn.addEventListener('click',function(){
    //定时器为空，开启计时
    if(!countId){
        countId = setInterval(CountTime, 1000);
    }else{
        StopTime();
    }
});
// ----------------------------重置------------------------
let resetBtn = document.getElementById('reset_Btn');
function ResetTime(){
    //先停止，清理定时器，防止重置后自动计时
    StopTime();
    let t = document.querySelectorAll('.t');
    for(let i = 0; i < t.length; i++){
        t[i].innerHTML = '0';
    }
}
resetBtn.addEventListener('click',ResetTime);

// -------------------------------------------------tab2----------------------------------------------------
// --------------------收起/展开提醒列表--------------------------
let unfoldBtn = document.getElementById('unfold_Btn');
let alarmNoteList = document.getElementById('alarm_noteList');
unfoldBtn.addEventListener('click',function(){
    alarmNoteList.classList.toggle('show');
})

// ------------------------添加闹钟提醒----------------------------
let alarmAddBtn = document.getElementById('alarm_addBtn');
function AddAlarm(){
    // 获取时间、事务
    let h = document.getElementById('alarm_h');
    let m = document.getElementById('alarm_m');
    let note = document.getElementById('alarm_addNote');
    //新建子元素、变更子元素内容、给提醒列表添加
    let alarmNoteList = document.getElementById('alarm_noteList');
    let node = document.createElement('div');
    node.innerHTML = `<span>${h.innerHTML}</span>:
    <span>${m.innerHTML}</span>
    <span>${note.value}</span>
    <button>-</button>`;
    alarmNoteList.appendChild(node);
}
alarmAddBtn.addEventListener('click',AddAlarm);

// -----------------------------------------猫猫--------------------------------------------------------------
let catBtn = document.getElementById('cat_btn');
console.log('欸嘿');
catBtn.addEventListener('click', function(){
    chrome.notifications.create(
        'ddd',
        {
            type: 'basic',
            title: '到啦!',
            message: '111',
            iconUrl: 'images/icon.png',
        }
    );    
});

// ------------------------------------------音乐-------------------------------------------------------------
// --------------------点击播放/暂停白噪音--------------------------------------
let musicBtn = document.getElementById('music_btn');
let musicPlayer = document.getElementById('white_noise');
function PlayMusic(){
    if(musicPlayer.paused) musicPlayer.play();
    else musicPlayer.pause();
}
musicBtn.addEventListener('click', PlayMusic);


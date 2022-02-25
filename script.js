let video = document.querySelector("video");
let recordBtnContainer = document.querySelector(".record-btn-container");
let captureBtnContainer = document.querySelector(".capture-btn-container");
let recordBtn = document.querySelector(".record-btn");
let captureBtn = document.querySelector(".capture-btn");  
let recordFlag = false;

let chunks = [];

let constraints = {
    video:true ,
    audio:true
}

//navigator -> global , browser info
navigator.mediaDevices.getUserMedia(constraints)
.then((stream) =>{
    video.srcObject = stream;

    recorder = new MediaRecorder(stream);

    recorder.addEventListener("start" , (e) =>{
        chunks = [];
    })
    
    recorder.addEventListener("dataavailable", (e) => {
        chunks.push(e.data);
    })
    
    recorder.addEventListener("stop" , (e) =>{
        //conversion of media chunks data to video
        let blob = new Blob(chunks , {type:"video/mp4"});
        let videoURL = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = videoURL;
        a.download = "stream.mp4";
        a.click();
    })
})

recordBtnContainer.addEventListener("click" , (e) =>{
    if( !recorder ) return ;
    recordFlag = !recordFlag;
    if(recordFlag){ // start
        recorder.start();
        recordBtn.classList.add("scale-record");
        startTimer();
    }else{ // stop
        recorder.stop();
        recordBtn.classList.remove("scale-record");
        stopTimer();
    }
})

let timerID;
let counter = 0; // represents total seconds
let timer = document.querySelector(".timer")
function startTimer(){
    timer.style.display = "block";
    function displayTimer(){
        let totalSeconds = counter;
        let hours = Number.parseInt(totalSeconds/3600);
        totalSeconds = totalSeconds % 3600;

        let minutes = Number.parseInt(totalSeconds/60);
        totalSeconds = totalSeconds % 60;

        let seconds = totalSeconds;

        hours = (hours < 10 ) ? `0${hours}`:hours;
        minutes = (minutes < 10 ) ? `0${minutes}`:minutes;
        seconds = (seconds < 10 ) ? `0${seconds}`:seconds;

        timer.innerText = `${hours}:${minutes}:${seconds}`;
        counter++;
    }
    timerID = setInterval(displayTimer, 1000);
}
function stopTimer(){
    timer.style.display = "none";
    clearInterval(timerID);
    timer.innerText = "00:00:00";
}

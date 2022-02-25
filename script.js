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
    }else{ // stop
        recorder.stop();
        recordBtn.classList.remove("scale-record");
    }
})

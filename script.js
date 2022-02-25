let video = document.querySelector("video");

let constraints = {
    video:true ,
    audio:true
}

//navigator -> global , browser info
navigator.mediaDevices.getUserMedia(constraints)
.then((stream) =>{
    video.srcObject = stream;
})
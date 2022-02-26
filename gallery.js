setTimeout(()=>{
    if( db ){
        //Retrieve video and images using the database
    
        let dbTransaction = db.transaction("video","readonly");
        let videoStore = dbTransaction.objectStore("video");
        let videoRequest = videoStore.getAll(); //Event Driven ... triggers the next line
        videoRequest.onsuccess = (e) => { 
            let galleryContainer = document.querySelector(".gallery-container");
            let videoResult = videoRequest.result;
            videoResult.forEach(videoObj => {   
                // console.log(videoObj);
                let mediaElem = document.createElement("div");
                mediaElem.setAttribute("class" , "media-container");
                mediaElem.setAttribute("id" , videoObj.id);

                let url = URL.createObjectURL(videoObj.blobData)

                mediaElem.innerHTML = `
                    <div class="type">.mp4</div>
                    <div class="media">
                        <video muted autoplay loop src="${url}"></video>
                    </div>
                    <div class="download action-btn">DONWLOAD</div>
                    <div class="delete action-btn">DELETE</div>
                `;

                galleryContainer.appendChild(mediaElem);

                //LISTENERS
                let deleteBtn = mediaElem.querySelector(".delete");
                deleteBtn.addEventListener("click" , deleteListener)

                let downloadBtn = mediaElem.querySelector(".download");
                downloadBtn.addEventListener("click" , downloadListener);

            });
        }

        //IMAGES

        let dbImageTransaction = db.transaction("image","readonly");
        let imageStore = dbImageTransaction.objectStore("image");
        let imageRequest = imageStore.getAll(); //Event Driven ... triggers the next line
        imageRequest.onsuccess = (e) => { 
            let galleryContainer = document.querySelector(".gallery-container");
            let imageResult = imageRequest.result;
            imageResult.forEach(imageObj => {   
                // console.log(imageObj);
                let mediaElem = document.createElement("div");
                mediaElem.setAttribute("class" , "media-container");
                mediaElem.setAttribute("id" , imageObj.id);

                let url = imageObj.url;

                mediaElem.innerHTML = `
                    <div class="type">.jpg</div>
                    <div class="media">
                        <img src="${url}" alt="${imageObj.id}" />
                    </div>
                    <div class="download action-btn">DONWLOAD</div>
                    <div class="delete action-btn">DELETE</div>
                `;

                galleryContainer.appendChild(mediaElem);

                //LISTENERS
                let deleteBtn = mediaElem.querySelector(".delete");
                deleteBtn.addEventListener("click" , deleteListener)

                let downloadBtn = mediaElem.querySelector(".download");
                downloadBtn.addEventListener("click" , downloadListener);

            });
        }
    }
} , 300)

function deleteListener(e){
    let id = e.target.parentElement.getAttribute('id');
    let type = id.slice(0,3);
    if( type === "vid"){
        let dbTransaction = db.transaction("video","readwrite");
        let videoStore = dbTransaction.objectStore("video");
        videoStore.delete(id);
    }
    else if( type === "img" ){
        let dbImageTransaction = db.transaction("image","readwrite");
        let imageStore = dbImageTransaction.objectStore("image");
        imageStore.delete(id);
    }

    e.target.parentElement.remove();
}

function downloadListener(e){
    let id = e.target.parentElement.getAttribute('id');
    let type = id.slice(0,3);
    if( type === "vid"){
        let dbTransaction = db.transaction("video","readwrite");
        let videoStore = dbTransaction.objectStore("video");
        let videoRequest = videoStore.get(id);
        videoRequest.onsuccess = (e) =>{
            let videoResult = videoRequest.result;
            
            let videoURL = URL.createObjectURL(videoResult.blobData);

            let a = document.createElement("a");
            a.href = videoURL;
            a.download = "stream.mp4";
            a.click();
        }
        
    }
    else if( type === "img" ){
        let dbImageTransaction = db.transaction("image","readwrite");
        let imageStore = dbImageTransaction.objectStore("image");
        let imageRequest = imageStore.get(id);

        imageRequest.onsuccess = (e) => {
            let imageURL = imageRequest.result.url ;
            let a = document.createElement("a");
            a.href = imageURL;
            a.download = "image.jpg";
            a.click();
        }   
    }
}
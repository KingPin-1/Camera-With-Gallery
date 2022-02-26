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
                let mediaElem = document.createElement("div");
                mediaElem.setAttribute("class" , "media-container");
                mediaElem.setAttribute("id" , videoObj.id);

                let url = URL.createObjectURL(videoObj.blobData)

                mediaElem.innerHTML = `
                    <div class="media">
                        <video muted autoplay loop src="${url}"></video>
                    </div>
                    <div class="download action-btn">DONWLOAD</div>
                    <div class="delete action-btn">DELETE</div>
                `;

                galleryContainer.appendChild(mediaElem);
            });
        }
    }
} , 100)
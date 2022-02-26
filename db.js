let db;
let openRequest = indexedDB.open("myDataBase");

openRequest.addEventListener("success" , (e) => {
    console.log("DB Success");
    db = openRequest.result;
})

openRequest.addEventListener("error" , (e) => {
    console.log("DB Error");
})

openRequest.addEventListener("upgradeneeded" , (e) => { //works everytime version parameter of line 2 is updated to a bigger number
    console.log("DB Upgraded and also for initial DB creation");
    db = openRequest.result;
    db.createObjectStore("video" , {keyPath : "id"}); // this method can only be called within upgradeneeded
    db.createObjectStore("image" , {keyPath : "id"}); // keypath -> unique -> used for identification
})
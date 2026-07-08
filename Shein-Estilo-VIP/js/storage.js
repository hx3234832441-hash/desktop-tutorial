const DB={

getMembers(){

return JSON.parse(localStorage.getItem("members"))||[];

},

saveMembers(data){

localStorage.setItem("members",JSON.stringify(data));

},

getRecords(){

return JSON.parse(localStorage.getItem("records"))||[];

},

saveRecords(data){

localStorage.setItem("records",JSON.stringify(data));

},

newId(){

return "VIP"+Date.now();

}

};
const socket = io();
var groupID = document.getElementById('groupID').innerHTML;
var listEl = document.getElementById('trade-user-numbers-list');

//Message from server
socket.emit('get_users_in_group', ({ groupID }));

socket.on('users_in_group', message => {
    console.log(message);
    outputMessage(message);
})

function outputMessage(message) {
    if (message.length < 1) {
        const itemEl = document.createElement('a');
        itemEl.classList.add('custom-list-item-a');
        itemEl.setAttribute('style', "font-size: 1em")
        itemEl.innerHTML = "There is no users in this group";
        listEl.appendChild(itemEl);  
    }
    for(var i = 0; i<message.length; i++){
        const itemEl = document.createElement('a');
        itemEl.classList.add('custom-list-item-a');
        
        itemEl.setAttribute('id', message[i])
        itemEl.setAttribute("href", "tradeingroup/"+ message[i]);
        itemEl.setAttribute('style', "display: inline-block; padding-right:25px;")
        if(Number(message[i]) < 10){
            message[i]='0'+message[i];
        }
        itemEl.innerHTML = message[i];

        if(i == 0) listEl.appendChild(itemEl);
        else listEl.insertBefore(itemEl, listEl.firstChild);
    }
}
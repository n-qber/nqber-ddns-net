document.addEventListener('DOMContentLoaded', function() {
    const rooms = document.querySelectorAll('.Room-A');
    const chatList = document.getElementById('Room-Cards');
    const chatContent = document.getElementById('chat-content');
    const header = document.querySelector('.header');
    const back = document.getElementById('back');
    const chatbox = document.querySelector('.chatbox');
    const chat_input = document.getElementById('chat-input');
    const sendbtn = document.getElementById('send');

    // Hide chat content
    chatbox.style.display = 'none';
    chat_input.style.display = 'none';
    
    //Verifica qual sala foi selecionada
    rooms.forEach(room => {
        room.addEventListener('click', function() {
            const roomName = this.querySelector('p').textContent.trim();
            loadChatRoom(roomName);
        });
    });
    back.addEventListener('click', function() {
        chatList.style.display = 'flex';
        chatContent.style.display = 'none';
        header.style.display = 'block';
    }
    );

    function sendMessage() {
        const message = chat_input.value;
        chat_input.value = '';
        ws.send(JSON.stringify({
            type: 'NEW_MESSAGE',
            room: roomName,
            message: message
        }));
        console.log(message);
    }
    sendbtn.addEventListener('click', sendMessage);

    function loadChatRoom(roomName) {
        // Hide chat list and show chat content
        chatList.style.display = 'none';
        chatContent.style.display = 'block';
        header.style.display = 'none';
        chatbox.style.display = 'block';
        chat_input.style.display = 'flex';
        console.log(roomName);

    }
});
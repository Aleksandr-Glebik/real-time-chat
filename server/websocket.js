const ws = require('ws')

const wss = new ws.Server(
    {
        port: 5000,
    },
    () => {console.log(`Server started on port 5000 ws`)}
)

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
    // ws.send('Пользователь glebikaa успешно подключен')
})

// const message = {
//     event: 'message/connection',
//     id: 123,
//     date: '20.10.2022',
//     username: 'Sasha Glebik',
//     message: 'Websocket !!!'
// }

function broadcastMessage(message) {
    wss.clients.forEach( client => {
        client.send(JSON.stringify(message))
    })
}
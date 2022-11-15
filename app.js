const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'ai2949',
    database: 'smd',
    port: '5432'
}); 



const port = process.env.PORT || 3040;

io.on('connection', (socket) => {
  console.log(`user connected id => ${socket.id}`);
  service_kkh(socket );

  socket.on('disconnect', () => {
    console.log(`user disconnected id => ${socket.id}`);
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));


function service_kkh(socket){
  pool.query("SELECT * FROM tb_transaction_state_smd WHERE host_location = 'kkh'",(err, result) => {
    if (err) {
        console.log('Error executing query boxitem')
      }else{
  socket.emit('service_kkh',result.rows);
 setTimeout(() => {
  service_kkh(socket);
  },10000);
  }
  })
}
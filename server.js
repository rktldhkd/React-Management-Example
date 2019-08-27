const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mySql = require('mysql');
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//db연결에 필요한 정보 정의
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const connection = mySql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});//createConnection-mysql
//db연결
connection.connect();

// ()=> == function() 과 같다. 6버전부터 새로 생긴 형식이다.매개함수 지정시 사용.
app.get('/api/customers', (request, response) => {
    // //배열형태의 데이터를 넣어주기만 하면 알아서 json 형태로 client에 응답한다.
    // response.send();//send()
    connection.query(
        "SELECT * FROM customer",
        (err, rows, fields) => {
            response.send(rows);
        }//내부함수 정의. 뒷쪽 =>를 앞쪽에다 function붙이는것으로 대체 가능
    );//query
});//get /api/customers

app.listen(port, () => console.log(`Listening on port ${port}`));
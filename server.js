const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//db연결에 필요한 정보 정의
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mySql = require('mysql');

const multer = require('multer'); //파일 이름을 겹치지않게 알아서 난수값으로 지정해줌.
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './upload');
    },//destination
    filename: function (req, file, callback) {
        //console.log('mimetype : ' + file.mimetype); //리턴값 예시: mimetype : image/png
        //console.log('mimetype[1] : ' + file.mimetype.split('/')[1]); //리턴값 예시: png
        let extension = file.mimetype.split('/')[1]; //파일 확장자 추출.
        let uploaded_time = new Date().valueOf();
 
        callback(null, file.fieldname + '-' + uploaded_time + '.' + extension);
    }//filename
  });//diskStorage
var upload = multer({ storage: storage })
//const upload = multer({dest: './upload'}); //업로드될 경로 지정

const connection = mySql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});//createConnection-mysql
//db연결
connection.connect();

app.use('/image', express.static('./upload'));//url맵핑. /image url지정시 ./upload(실제 폴더)로 경로탐색됨.

// ()=> == function() 과 같다. 6버전부터 새로 생긴 형식이다.매개함수 지정시 사용.
app.get('/api/customers', (request, response) => {
    // //배열형태의 데이터를 넣어주기만 하면 알아서 json 형태로 client에 응답한다.
    // response.send();//send()
    connection.query(
        "SELECT * FROM customer WHERE isDeleted=0",
        (err, rows, fields) => {
            if(err){console.log(err);}
            //console.log(rows);
            response.send(rows);
        }//내부함수 정의. 뒷쪽 =>를 앞쪽에다 function붙이는것으로 대체 가능
    );//query
});//get /api/customers

//multer.single : 사용자가 전송한 데이터에서 만약에 파일이 포함되어 있다면 파일을 가공해서 request객체에 file이라는 프로퍼티를 multer라는 모듈을 통해서 추가하는 코드. 
//single() 안의 매개인자 문자열은 form양식의 input file의 name 값과 같게해준다.
app.post('/api/customers', upload.single('image'), (request, response) => {
    let sql = 'INSERT INTO customer(image, name, birthday, gender, job, createdDate, isDeleted) VALUES(?, ?, ?, ?, ?, NOW(), 0)';
    
    //form데이터를 받을 때 사용하는 body-poarser의 body.
    //post로 요청된 body를 쉽게 추출할 수 있는 모듈이다. 추출된 결과는 request객체(IncomingMessage 타입)에 body 속성으로 저장된다
    //서버로 넘어온 form데이터들 변수에 할당.
    //서버에서 이미지를 못받아와서 강제로 5000포트 추가했다.
    let image = 'http://localhost:5000' + '/image/' + request.file.filename; //이미지파일 upload폴더에 업로드. 바로 위의 app.use에서 /image와 ./upload폴더 맵핑했다.
    let name = request.body.name; 
    let birthday = request.body.birthday;
    let gender = request.body.gender;
    let job = request.body.job;

    //배열형태로 쿼리문에 전달할 변수.
    let params = [image, name, birthday, gender, job];

    //실제로 쿼리문에 form 데이터값들 바인딩 할당.
    connection.query(sql, params, 
        (err, rows, fields) => {
            if(err){console.log(err);}
            response.send(rows); //성공적으로 데이터 입력 시, 관련 메시지를 client에 전송
        }
    )//query()
});//post

app.delete('/api/customers/:id', (req,res) => {
    let sql = 'UPDATE customer SET isDeleted = 1 WHERE id= ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            if(err){console.log(err);}
            res.send(rows);
        }//function
    );//query()
})//delete()

app.listen(port, () => console.log(`Listening on port ${port}`));
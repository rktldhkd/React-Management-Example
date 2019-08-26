const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// ()=> == function() 과 같다. 6버전부터 새로 생긴 형식이다.매개함수 지정시 사용.
app.get('/api/customers', (request, response) => {
    //배열형태의 데이터를 넣어주기만 하면 알아서 json 형태로 client에 응답한다.
    response.send([
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': '홍길동',
            'birthday': '991111',
            'gender': '남자',
            'job': '무'
        },
        {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '청길동',
            'birthday': '990111',
            'gender': '남자',
            'job': '무'
        },
        {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '이선계',
            'birthday': '110111',
            'gender': '남자',
            'job': '무'
        }
    ]);//send()
});//get /api/customers

app.listen(port, () => console.log(`Listening on port ${port}`));
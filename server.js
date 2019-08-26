const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ()=> == function() 과 같다. 6버전부터 새로 생긴 형식이다.매개함수 지정시 사용.
app.get('/api/hello', (request, response) => {
    response.send({message: 'Hello Express!'});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper'; 
import Table from '@material-ui/core/Table'; //스타일 프레임워크 material-ui
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { async } from 'rxjs/internal/scheduler/async';

//css 스타일 적용위한 변수 선언. 여기에 스타일 지정
const styles =  theme => ({
  //DOM객체의 ID
  root: {
    width: '100%',
    marginTop: theme.spacing(3), //여분 공간을 주는 것.
    overflowX: "auto"
  },
  table: {
    minWidth: 1400
  },
  progress: {//progress bar 스타일
    margin: theme.spacing(2)
  }
});//styles

class App extends React.Component{

  state = {
    customers: "",
    completed: 0 //progress bar의 게이지값.
  }//값이 변경될 수 있는 변수 state의 변수 지정영역

  componentDidMount() {
    //데이터가 얼마 없어서 progress bar가 보일 새 없이 지나가버리면, 아래의 데이터를 가져오는
    //callApi함수를 잠시 주석처리한다.
    this.timer = setInterval(this.progress, 20); //0.02초마다 실행

    //순서
    //1. callApi함수를 호출하여 body(파라미터들)을 가져온다.
    //2. then()함수의 response에 body를 담는다.
    //3. 그리고 그 response customers에 세팅한다.
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }//componentDidMount()

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json(); //서버에서 데이터 받아오는 부분
    return body;
  }//callApi()

  progress = () =>{
    const { completed } = this.state;
    this.setState({ completed: completed>=100 ? 0:completed+1 });
  }//progress()

  render(){
    //이 classes 객체와 styles객체에서 정의한 스타일을 연동 가능. html의 className 속성에 styles에서 정의한 이름 할당.
    const { classes } = this.props; //스타일 적용을 위한 변수 classes 선언. <- css 스타일 적용위한 코드 1
    return (//위에서 정의한 스타일값들 적용 className 옵션. <- css 스타일 적용위한 코드 2
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { // c: 해당 index별 고객정보객체.
              //map을 사용할때는 꼭 key값을 지정해줘야한다. 안하면 에러.
              //3항연산자 사용. 비동기 방식으로 데이터 불러오는 거라, 처음엔 데이터가 없다.
              //따라서 3항연산자로 데이터가 있는지 물어본 후, 상황에 맞는 화면 출력
              this.state.customers ? 
              this.state.customers.map(c => {
                return(
                  <Customer 
                    key={c.id}
                    id={c.id}
                    image={c.image}
                    name={c.name} 
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
                );//inner return
              })//map
              : 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
    );//return
  }//render()
}//class

export default withStyles(styles)(App); //css 스타일 적용위한 코드 3
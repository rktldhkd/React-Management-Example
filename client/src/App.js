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
import { withStyles } from '@material-ui/core/styles';

//css 스타일 적용위한 변수 선언. 여기에 스타일 지정
const styles =  theme => ({
  //DOM객체의 ID
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1400
  }
});//styles

const customers = [
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
]
class App extends React.Component{
  render(){
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
              customers.map(c => {
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
            }
          </TableBody>
        </Table>
      </Paper>
    );//return
  }//render()
}//class

export default withStyles(styles)(App); //css 스타일 적용위한 코드 3
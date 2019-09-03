import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@material-ui/core/Paper'; 
import Table from '@material-ui/core/Table'; //스타일 프레임워크 material-ui
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { async } from 'rxjs/internal/scheduler/async';

//for app bar with search field. 화면 상단의 검색창을 포함한 타이틀/메뉴바
//https://material-ui.com/components/app-bar/
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

//css 스타일 적용위한 변수 선언. 여기에 스타일 지정
const styles = theme => ({
  //DOM객체의 ID
  root: {
    width: '100%',
    minWidth: 1080
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {//progress bar 스타일
    margin: theme.spacing(2)
  },
  tableHead: {
    fontSize: '1.2rem'
  },
  menu: {
    margin: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center' //가운데정렬
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});//styles

class App extends React.Component{

  // state = {
  //   customers: "",
  //   completed: 0 //progress bar의 게이지값.
  // }//값이 변경될 수 있는 변수 state의 변수 지정영역

  constructor(props){
    super(props);
    this.state={
      customers: '',
      completed: 0,
      searchKeyword: ''
    }
  }//생성자

  //데이터 갱신. 값이 갱신되면, 화면의 데이터도 같이 갱신되어야 한다.
  stateRefresh = () =>{
    this.setState({
      customer: '',
      completed: 0,
      searchKeyword: ''
    });//setState
    
    //데이터 불러오기
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }//stateRefresh()

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

  //사용자가 값을 입력할때마다 DOM객체에 최신화해주는 기능.
  handleValueChange = (e) =>{
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render(){
    //이 classes 객체와 styles객체에서 정의한 스타일을 연동 가능. html의 className 속성에 styles에서 정의한 이름 할당.
    const { classes } = this.props; //스타일 적용을 위한 변수 classes 선언. <- css 스타일 적용위한 코드 1
    const headCellList = ["번호", "이미지", "이름", "생년월일", "성별", "직업", "설정"];
    
    //검색바에서 해당 고객에대해서 검색하고, 있으면 그 고객만 출력, 없으면 전체 출력.
    const filteredComponents = (data) =>{
      data = data.filter((c) => {
        //console.log("c.name.indexOf : " + c.name.indexOf(this.state.searchKeyword))
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });//data 
      return data.map((c) => {
        return <Customer 
                  stateRefresh= {this.stateRefresh}
                  key= {c.id}
                  id= {c.id}
                  image= {c.image}
                  name= {c.name}
                  birthday= {c.birthday}
                  gender= {c.gender}
                  job= {c.job}
                />
      })//map
    };

    return (//위에서 정의한 스타일값들 적용 className 옵션. <- css 스타일 적용위한 코드 2
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              고객 관리 시스템
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                name="searchKeyword"
                id="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>
        
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh}/>
        </div>

        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {
                  /*
                  // <TableCell>번호</TableCell>
                  // <TableCell>이미지</TableCell>
                  // <TableCell>이름</TableCell>
                  // <TableCell>생년월일</TableCell>
                  // <TableCell>성별</TableCell>
                  // <TableCell>직업</TableCell>
                  // <TableCell>설정</TableCell>
                  */
                }
                {
                  headCellList.map(c => {
                    return <TableCell className={classes.tableHead}>{c}</TableCell>;
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              { // c: 해당 index별 고객정보객체.
                //map을 사용할때는 꼭 key값을 지정해줘야한다. 안하면 에러.
                //3항연산자 사용. 비동기 방식으로 데이터 불러오는 거라, 처음엔 데이터가 없다.
                //따라서 3항연산자로 데이터가 있는지 물어본 후, 상황에 맞는 화면 출력
                this.state.customers ? 
                  filteredComponents(this.state.customers) //검색기능 추가 이후 코드
                  /*
                  검색기능 추가 이전 코드
                  {this.state.customers.map(c=> {
                    return(<Customer 
                            stateRefresh= {this.stateRefresh}
                            key= {c.id}
                            id= {c.id}
                            image= {c.image}
                            name= {c.name}
                            birthday= {c.birthday}
                            gender= {c.gender}
                            job= {c.job}
                            />
                          )
                    })
                  }
                  */
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
      </div>
    );//return
  }//render()
}//class

export default withStyles(styles)(App); //css 스타일 적용위한 코드 3
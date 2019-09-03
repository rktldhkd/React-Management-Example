import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles'; //스타일 적용위함

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})//styles

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        }//state 정의
    }//생성자

    handleForSubmit = (event) => {
        event.preventDefault();
        this.addCustomer()
            .then((response) => {
                console.log(response.data); //건너온 데이터 출력
                this.props.stateRefresh(); //서버로 데이터 갱신하고 난 후, refresh 하고있다.
            })//then()
        this.setState({ //submit후, 양식을 빈칸으로 만듦
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }//handleForSubmit()

    //변경된 내용이 들어가는 setState
    //event.target : handleFileChange() 가 발생한 객체 당사자
    handleFileChange = (event) =>{
        //이 프로젝트에서는 파일 하나만 올리므로 0번째 인덱스 명시함
        //event객체에 html 태그에서 클라이언트가 입력한 정보들이 담겨져 있다. html태그의 속성의 값들
        this.setState({
            file: event.target.files[0],
            fileName: event.target.value
        })//setState()
    }//handleFileChange()

    //현재 state값 갱신. 사용자가 입력한 정보들로 갱신.
    handleValueChange = (event) => {
        let nextState = {};
        nextState[event.target.name] = event.target.value;
        this.setState(nextState); //실제 적용
    }//handleValueChange()

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        //파일 포함한 데이터를 서버로 전송시 필요한 정의.
        const config = {
            headers: {
                'content-type': 'multipart-form-data'
            }//headers
        }//config
        //axios에 포함된 post library. 서버로 전송하는 기능.
        return post(url, formData, config); //해당 url에 formData객체를 config에 맞게 서버로 전송. 
    }//addCustomer()

    handleClickOpenPopup = () => {
        this.setState({
            open: true
        })
    }//handleClickOpenPopup()

    handleClickClosePopup = () => {
        this.setState({ //submit후, 양식을 빈칸으로 만듦
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        });//setState
    }//handleClickOpenPopup()

    render(){
        const { classes } = this.props;
        //onChange 속성 : 값이 변경되면 감지하는 함수 선택.
        //variant 속성 : 디자인의 종류. 객체의 모양 설정.
        //color 속성 : 객체의 색깔 설정.
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpenPopup}>
                    고객 추가하기
                </Button>
                
                {/* dialog객체의 open 속성에 따라 팝업창이 켜지고 꺼진다. */}
                <Dialog open={this.state.open} onClose={this.handleClickClosePopup}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        {/*
                            accept 속성 : 해당 객체에 입력할 수 있는 값 설정. 여기선 image만 허용했다.
                            input태그 hidden상태로 만들고 파일만 나르는 용도로 사용.
                            화면에 출력하는 버튼 부분은 label태그 이하 내용.
                            htmlFor 속성으로 input file 태그와 label태그 연동
                        */}
                        <input type="file" className={classes.hidden} accept="image/*" id="raised-button-file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>

                        <div><TextField label="이름" type="text" name="userName" id="userName" value={this.state.userName} onChange={this.handleValueChange} /></div>
                        <div><TextField label="생년월일" type="text" name="birthday" id="birthday" value={this.state.birthday} onChange={this.handleValueChange} /></div>
                        <div><TextField label="성별" type="text" name="gender" id="gender" value={this.state.gender} onChange={this.handleValueChange} /></div>
                        <div><TextField label="직업" type="text" name="job" id="job" value={this.state.job} onChange={this.handleValueChange} /></div>
                    </DialogContent>

                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleForSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClosePopup}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>

            /* 팝업창으로 띄우기 전, 화면으로 볼때의 코드
            //modal로 띄울때는 input을 import한 TextField로 대체한다. 그리고 label 속성에 항목명(이름/생년월일/성별/직업)을 설정한다.
            <form onSubmit={this.handleForSubmit} encType="multipart/form-data">
                <h1>고객 추가</h1>
                <p>
                    프로필 이미지 : <input type="file" name="image" id="image" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
                </p>
                <p>
                    이름 : <input type="text" name="userName" id="userName" value={this.state.userName} onChange={this.handleValueChange} />
                </p>
                <p>
                    생년월일 : <input type="text" name="birthday" id="birthday" value={this.state.birthday} onChange={this.handleValueChange} />
                </p>
                <p>
                    성별 : <input type="text" name="gender" id="gender" value={this.state.gender} onChange={this.handleValueChange} />
                </p>
                <p>
                    직업 : <input type="text" name="job" id="job" value={this.state.job} onChange={this.handleValueChange} />
                </p>
                <p>
                    <button type="submit">추가하기</button>
                </p>
            </form>
            */
        );//return
    }//render()

}//class

export default withStyles(styles)(CustomerAdd);
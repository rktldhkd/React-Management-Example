import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
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
            fileName: ''
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
        this.setState(nextState);
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

    render(){
        //onChange 속성 : 값이 변경되면 감지하는 함수 선택
        return(
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
        )//return
    }//render()

}//class

export default CustomerAdd;
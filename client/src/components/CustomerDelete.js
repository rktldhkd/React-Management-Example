import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CustomerDelete extends React.Component{
    constructor(props){
        super(props);
        this.state={
            open: false
        }
    }//생성자

    handleClickOpenPopup = () => {
        this.setState({
            open: true
        })
    }//handleClickOpenPopup()

    handleClickClosePopup = () => {
        this.setState({ //submit후, 양식을 빈칸으로 만듦
            open: false
        });//setState
    }//handleClickOpenPopup()

    deleteCustomer(id){
        const url = '/api/customers/'+id;
        //해당 경로로 접속
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();//삭제후 화면 고침.데이터갱신
    }//deleteCustomer()
    
    //<button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
    //여기선 deleteCustomer에서 setState로 open값을 false설정 안해줘도 된다.
    //삭제 후, stateRefresh가 되고, 생성자에 의해 open의 값이 false가 되기 때문이다.
    render(){
        return(
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpenPopup}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClickClosePopup}>
                    <DialogTitle onClose={this.handleClickClosePopup}>삭제 경고</DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClosePopup}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );//return()
    }//render()
}//class

export default CustomerDelete;
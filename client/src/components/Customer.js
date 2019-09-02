import React from 'react';
import TableRow from '@material-ui/core/TableRow' //CSS같은 스타일을 위한 스타일 프레임워크 material-ui
import TableCell from '@material-ui/core/TableCell'

//components
import CustomerDelete from './CustomerDelete';

//Customer 클래스에 대한 계층적 구조 CustomerProfile, CustomerInfo
//component는 기본적으로 props 프로퍼티를 가지고 있다. 파라미터값을 가지고 있는 객체.
//따라서 props를 따로 정의하거나 선언할 필요없이 사용만하면 된다.
class Customer extends React.Component{
    render(){
        const img_style = {
            width:100
        };

        return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile" style={img_style}/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell><CustomerDelete id={this.props.id} stateRefresh={this.props.stateRefresh}/></TableCell>
            </TableRow>
        );//return
    }//render
}//class

export default Customer;
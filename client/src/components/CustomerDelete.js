import React from 'react'

class CustomerDelete extends React.Component{
    deleteCustomer(id){
        const url = '/api/customers/'+id;
        //해당 경로로 접속
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();//삭제후 화면 고침.데이터갱신
    }//deleteCustomer()
    
    render(){
        return(
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        );//return()
    }//render()
}//class

export default CustomerDelete;
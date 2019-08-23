import React from 'react';

//Customer 클래스에 대한 계층적 구조 CustomerProfile, CustomerInfo
//component는 기본적으로 props 프로퍼티를 가지고 있다. 파라미터값을 가지고 있는 객체.
class Customer extends React.Component{
    render(){
        return(
            <div>
                <Customerprofile id={this.props.id} image={this.props.image} name={this.props.name}/>
                <CustomerInfo birthday={this.props.birthday} gender={this.props.gender} job={this.props.job}/>
            </div>
        );//return
    }//render
}//class

class Customerprofile extends React.Component{
    render(){
        return(
            <div>
                <img src={this.props.image} alt="profile"/>
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        );//return
    }//render
}//class

class CustomerInfo extends React.Component{
    render(){
        return(
            <div>
                <p>{this.props.name}</p>
                <p>{this.props.birthday}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
            </div>
        );//return
    }//render
}//class

export default Customer;
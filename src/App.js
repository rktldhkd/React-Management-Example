import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import Customer from './components/Customer'

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
    return (
      <div>
        {// c: 해당 index별 고객정보객체.
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
            )//return
          })//map
        }
      </div>

      // customer의 값을 전달하고 있다. 받는쪽에서는 객체명은 제외하고, this.props.속성명 만으로 값을 받는다.
      // <Customer 
      //   id={customers[0].id}
      //   image={customers[0].image}
      //   name={customers[0].name} 
      //   birthday={customers[0].birthday}
      //   gender={customers[0].gender}
      //   job={customers[0].job}
      // />
    );//return
  }//render()
}//class

export default App;

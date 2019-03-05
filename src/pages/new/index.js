import React,{Component} from 'react'
import styles from './index.less'

export default class New extends Component{
  constructor(props){
    super(props)
    this.state={}
  }

  render(){
    return(
      <div className={styles.newContainer}>
        <div>
          {/*<img src={require('../../assets/')}/>*/}
        </div>

      </div>
    )
  }
}

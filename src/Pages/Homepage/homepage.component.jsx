import React, {Component} from 'react';
import firebase from '../../firebase/firebase';
import ResultsWrapper from '../../Components/Results-Wrapper/results-wrapper.component';
import { Loader } from '../../Components/Loader/loader.component';

class Home extends Component {
  constructor(){
    super();

    this.state = {
      data: [],
      tags: [],
      searchQuery: '',
      isLoading: false
    }
  }

  fetchData = async() => {
    this.setState({
      isLoading: true
    })

    const db = firebase.firestore()
    const dataRaw = await db.collection('recipes').get()
    const data = dataRaw.docs.map(doc => doc.data());
    this.setState({
      data: data,
      isLoading: false
    })
  }

  componentDidMount(){
    this.fetchData();
  }

  render(){
    const {data, isLoading} = this.state;
    return (
      <div>
        <h1>Fooooood</h1>
        {
          isLoading ?
          <Loader />
          :
          <ResultsWrapper 
            data={data}
          />
        }
      </div>
    )
  }
}

export default Home;
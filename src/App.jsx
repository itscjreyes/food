import React, {Component} from 'react';
import './App.scss';
import { Route } from 'react-router-dom';
import Home from './Pages/Homepage/homepage.component';
import DetailPage from './Pages/Detail/detail.component';
import ScrollIntoView from './Components/ScrollIntoView/scrollintoview.component';
import EditPage from './Pages/Edit/edit.component';
import AddPage from './Pages/Add/add.component';

class App extends Component {
  render(){
    return(
      <div className="App">
        <ScrollIntoView>
            <Route exact path="/" component={Home} />
            <Route exact path="/:pageId" component={DetailPage} />
            <Route path="/:pageId/edit" component={EditPage} />
            <Route exact path="/recipes/add" component={AddPage} />
        </ScrollIntoView>
      </div>
    )
  }
}

export default App;

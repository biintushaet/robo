import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import {robots} from './robots';
import './App.css';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      robots: robots,
      searchField: ''
    }   
  }
  
  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value})
  }

  render() {
    const filteredRobots = this.state.robots.filter(robot =>{
      return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase());
    });

    if(this.state.robots.length === 0) {
      return <h1 className='tc'>Loading</h1>
    }else {
      return(
        <div className='tc' >
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <CardList robots={ filteredRobots } />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
    }    
  }
}

export default App;

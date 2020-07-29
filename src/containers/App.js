import React from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import {robots} from './robots';
import './App.css';

import  { setSearchField } from '../actions';

const mapStateToProps = state => {
  return{
    searchField: state.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      robots: robots,
      // searchField: ''
    }   
  }
  
  // onSearchChange = (event) => {
  //   this.setState({ searchField: event.target.value})
  // }

  render() {
    const { searchField, onSearchChange } = this.props;
    const filteredRobots = this.state.robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    if(this.state.robots.length === 0) {
      return <h1 className='tc'>Loading</h1>
    }else {
      return(
        <div className='tc' >
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

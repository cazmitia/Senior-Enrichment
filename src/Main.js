import React, {Component} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Campuses from './Campuses'
import Students from './Students'
import Navbar from './Navbar'
import {getCampusesFromServer, getStudentsFromServer} from './store'
import { connect } from 'react-redux';

class Main extends Component {
    
    componentDidMount() {
        Promise.all([this.props.getStudents(), this.props.getCampuses()])
        .then(() => console.log(this.props))
    }

    render() {
        return (
            <div>
                <h1>test</h1>
                <Router>
                    <Navbar />
                    <Route path='/campuses' component={Campuses} />
                    <Route path='/students' component={Students} />
                </Router>
            </div>
            
        )
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        getCampuses: () => dispatch(getCampusesFromServer()),
        getStudents: () => dispatch(getStudentsFromServer())
    }
)

export default connect(null, mapDispatchToProps)(Main)
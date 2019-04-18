import React, {Component} from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Campuses from './Campuses'
import Students from './Students'
import Navbar from './Navbar'
import SingleCampus from './SingleCampus'
import SingleStudent from './SingleStudent'
import AddForm from './AddForm'
import {getCampusesFromServer, getStudentsFromServer} from './store'
import { connect } from 'react-redux';

class Main extends Component {
    
    componentDidMount() {
        Promise.all([this.props.getStudents(), this.props.getCampuses()])
    }

    render() {
        return (
            <div>
                <Router>
                    <Route component={Navbar} />
                    <Switch>
                    <Route exact path='/campuses/add' component={AddForm} />
                    <Route exact path='/students/add' component={AddForm} />
                    <Route path='/campuses/:id' component={SingleCampus} />
                    <Route path ='/students/:id/update' component={AddForm} />
                    <Route path ='/students/:id' component={SingleStudent} />
                    <Route exact path='/students' component={Students} />
                    <Route exact path='/campuses' component={Campuses} />
                    <Route exact path='/' component={Campuses} />
                    </Switch>
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
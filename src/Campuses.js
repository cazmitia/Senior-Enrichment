import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteCampus} from './store'

class Campuses extends Component {

    render() {
        const {campuses} = this.props
        return (
            <div>
                <h1 style={{display: 'inline'}}>Campuses</h1><Link to='/campuses/add'>Add A New Campus</Link>
                <ul>
                    {campuses.map(campus => (
                        <li key={campus.id} >
                            <Link to={`campuses/${campus.id}`} > {campus.name} <img src={campus.imageUrl} /> </Link>
                            <button type='button' onClick={() => this.props.deleteCampus(campus.id)} >Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        campuses: state.campuses,
        students: state.students
    }
)

const mapDispatchToProps = dispatch => (
    {
        deleteCampus: campusId => dispatch(deleteCampus(campusId))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Campuses)

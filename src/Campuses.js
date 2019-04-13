import React, {Component} from 'react'
import {connect} from 'react-redux'

class Campuses extends Component {

    render() {
        const {campuses} = this.props
        return (
            <div>
                <h1>Campuses</h1>
                <ul>
                    {campuses.map(campus => (
                        <li key={campus.id}>
                            {campus.name} <img src={campus.imageUrl} />
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

export default connect(mapStateToProps)(Campuses)

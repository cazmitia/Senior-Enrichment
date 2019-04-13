import {createStore, applyMiddleware} from 'redux'
import axios from 'axios'
import thunkMiddleware from 'redux-thunk'

const GOT_ALL_CAMPUSES = 'GOT_ALL_CAMPUSES'
const GOT_ALL_STUDENTS = 'GOT_ALL_STUDENTS'
const initialState = {campuses: [], students: []}

const gotCampuses = campuses => (
    {
        type: GOT_ALL_CAMPUSES,
        campuses
    }
)

const gotStudents = students => (
    {
        type: GOT_ALL_STUDENTS,
        students
    }
)

export const getCampusesFromServer = () => {
    return dispatch => {
        return axios.get('/api/campuses')
        .then(response => {
            return gotCampuses(response.data)
        })
        .then(action => dispatch(action))
    }
}

export const getStudentsFromServer = () => {
    return dispatch => {
        return axios.get('/api/students')
        .then(response => {
            console.log(response.data)
            return gotStudents(response.data)
        })
        .then(action => dispatch(action))
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GOT_ALL_CAMPUSES: {
            return {...state, campuses: action.campuses}
        }
        case GOT_ALL_STUDENTS: {
            return {...state, students: action.students}
        }
        default: {
            return state
        }
    }
}
const store = createStore(reducer, applyMiddleware(thunkMiddleware))

export default store

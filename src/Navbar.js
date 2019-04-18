import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const Navbar = (props) => {
    const value = props.location.pathname.slice(0, 9) || 0
    return (
        <div>
            <AppBar position='fixed'>
                <Tabs value={value} centered={true}>
                    <Tab label='Campuses' value={'/campuses'} href='/#/campuses'/>
                    <Tab label='Students' value='/students' href='/#/students'/>
                </Tabs>
            </AppBar>
        </div>
    )
}

export default Navbar

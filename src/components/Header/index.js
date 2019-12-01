import React from 'react'
import { Route } from "react-router";
import PropTypes from 'prop-types'
import NavBar from "./../NavBar" 
import Input from "./../Input" 

const Header = props => {
    return (
        <header>
            <NavBar />
            <Input />
        </header>
    )
}

Header.propTypes = {

}

export default Header

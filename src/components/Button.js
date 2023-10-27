import React from 'react'
import PropTypes from 'prop-types'
 
const Button = ({color,text, onClick}) => {
  
  return(
    <div
    onClick={onClick}
     style={{backgroundColor:color}}
     className='btn'>
    {text}
   
    </div>

  ) 
  
}
Button.defaultProps = {
    color:'steelblue'
}
Button.propType = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

export default Button

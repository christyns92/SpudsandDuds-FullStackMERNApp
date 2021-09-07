import React from 'react'
import nick from '../images/cage.gif'

function Cage(){
    return(
    <div id='cage-page'className="text-align-center">
        <h2>You've found the Cage Page</h2>
    <img className='cage-man' src={nick} alt='Nicholas Cage'/>
    </div>
    )
}
export default Cage
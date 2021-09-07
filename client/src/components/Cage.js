import React from 'react'
import nick from '../images/cage.gif'
import nicPotato from '../images/nicolascage.jpg'

function Cage(){
    return(
    <div id='cage-page'className="text-align-center justify-content-stretch">
        <h2>You've found the Cage Page</h2>
    <img className='cage-man' src={nick} alt='Nicholas Cage'/>
    <img className='nicPotato' src={nicPotato} alt='NicPotato'/>
    </div>
    )
}
export default Cage
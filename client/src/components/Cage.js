import React from 'react'
import nick from '../images/cage.gif'
import nicPotato from '../images/nicolascage.jpg'

function Cage() {
    return (
        <div className="text-align-center cageContainer theMovieRundown">
            <h2>You've found the Cage Page</h2>

            <div className='text-align-center cage m-auto row'>
                <div id='cage-page' className='text-align-center col-12 pb-4'>
                    <img className='col-12' src={nick} alt='Nicholas Cage' />

                </div>
                <div className=' text-align-center col-12'>
                    <img className=' col-12' src={nicPotato} alt='NicPotato' />

                </div>
            </div>
        </div>
    )
}
export default Cage
import React from 'react'
import './NavBar.scss'
import ReactTooltip from 'react-tooltip';
import Reset from './icons/Reset';
import Help from './icons/Help';
import Pathfindings from './pathfindings/Pathfindings';
import Mazes from './mazes/Mazes';

export default function NavBar() {

    return (
        <div className='navbar'>
            <div className="container">
				<div className="left">
					<div className="logo">
						<img src="https://cdn-icons-png.flaticon.com/512/182/182580.png" alt="from flaticon" />
						<span>Pathfinder</span>
					</div>
					<Mazes/>
          			<Pathfindings/>
				</div>
        <div className="right">
					<Reset/>
					<Help/>
					<ReactTooltip className='tooltip-class' delayHide={500} place='bottom' effect='solid' globalEventOff="click" />
				</div>
			</div>
        </div>
    )
}

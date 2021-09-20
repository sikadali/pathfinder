import React from 'react'
import Grid from '../components/grid/Grid'
import NavBar from '../components/navbar/NavBar'
import StoreProvider from '../utils/StoreProvider'
import './Home.scss'

export default function home() {
    return (
        <StoreProvider>
            <div className='home'>
                <NavBar/>
                <Grid/>
            </div>
        </StoreProvider>
    )
}

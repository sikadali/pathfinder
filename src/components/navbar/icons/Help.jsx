import React from 'react'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export default function Help({childToParent}) {
    return (
        <div>
            <HelpOutlineIcon className="icon" data-tip="Help" onClick={() => childToParent()}/>
        </div>
    )
}

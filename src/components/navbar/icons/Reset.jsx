import React from 'react'
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

export default function Reset({childToParent}) {
    return (
        <div>
            <RotateLeftIcon className="icon" data-tip="Reset" onClick={() => childToParent()}/>
        </div>
    )
}

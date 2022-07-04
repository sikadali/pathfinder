import React, { useContext } from 'react'
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { StoreContext } from '../../../utils/StoreProvider';

export default function Reset() {
    const {
        grid: [grid, setGrid], 
        gridState: [ gridState, setGridState ]
      } = useContext(StoreContext);


    const resetGrid = () => {
        // if there is a start node || end node (possibly some visited nodes) 
        // => then only all non-wall nodes are reset
        if(gridState.hasStart || gridState.hasEnd) {
            grid.forEach((row, rowkey) => {
                row.forEach((node, nodekey) => {
                    if (!node.isWall && !node.isStart && !node.isEnd) {
                        // reset the node properties
                        // setGrid( (prev) => new Map(prev).set(rowkey, new Map(prev.get(rowkey))
                        //     .set(nodekey, {...node, isEnd: false, isStart: false})) );
                        // reset the node style, in case it was visited by an algorithm
                        document.getElementById(`node-${node.row}-${node.col}`)
                            .className = "node";
                    }
                    if (node.isStart) {
                        document.getElementById(`node-${node.row}-${node.col}`)
                            .className = "node start";
                    }
                    if (node.isEnd) {
                        document.getElementById(`node-${node.row}-${node.col}`)
                            .className = "node end";
                    }
                })
            })
            // setGridState({...gridState, hasEnd: false, hasStart: false});
        }
        // else, remove the potential wall nodes present
        else{
            grid.forEach((row, rowkey) => {
                row.forEach((node, nodekey) => {
                    // reset the node properties
                    setGrid( (prev) => new Map(prev).set(rowkey, new Map(prev.get(rowkey))
                        .set(nodekey, {...node, isWall: false, isEnd: false, isStart: false})) );
                    // reset the node style, in case it was visited by an algorithm
                    document.getElementById(`node-${node.row}-${node.col}`)
                        .className = "node";
                })
            })
            setGridState({...gridState, hasEnd: false, hasStart: false});
        }
    }

    return (
        <div>
            <RotateLeftIcon className="icon" data-tip="Reset" onClick={() => resetGrid()}/>
        </div>
    )
}

import React, { useState, useEffect, useCallback, memo } from 'react'
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import PropTypes from 'prop-types'
import { useJSON } from './useObject';
import './index.scss';

const treeStatus = {
    expandAll: {
        status: true,
        text: 'Expand all'
    },
    colapseAll: {
        status: false,
        text: 'Colapse all'
    },
};
const JSONTree = ({ data = {} }) => {
    const [cursor, setCursor, setAll] = useJSON(data); //Task 2: custom hook for json object
    const [allStatus, setAllStatus] = useState(treeStatus.expandAll)


    const onToggle = useCallback((node) => {
        setCursor({ [node]: !cursor[node] });
    }, [cursor]);

    const onToggleAll = useCallback(() => {
        setAll(allStatus.status);
    }, [allStatus])

    const flatten = (object) => {
        const strNodeKey = JSON.stringify(object);
        const isVisible = cursor[strNodeKey] && 'active';
        const toggleButton = cursor[strNodeKey] ?
            <RemoveIcon color="primary" fontSize="small" /> :
            <AddIcon color="primary" fontSize="small" />

        return (
            <ul className="list" key={strNodeKey}>
                <span className="list__icon" onClick={() => onToggle(strNodeKey)} >
                    {toggleButton}
                    < span > Objects inside: {Object.keys(object).length} </span>
                </span >
                <div className={`list-item ${isVisible}`} key={object}>
                    {
                        Object.entries(object).map(([key, value], index) => {
                            return (
                                (typeof (value) === 'object') ?
                                    flatten(value) :
                                    (
                                        <li key={key} className="list-item__element">
                                            <span>key:</span>{key}
                                            <span>value:</span>{value.toString()}
                                        </li>
                                    )
                            )
                        })}
                </div>
            </ul >
        )
    };

    useEffect(() => {
        let treeValue = !Object.keys(cursor).every((key) => cursor[key]) ? treeStatus.expandAll : treeStatus.colapseAll;
        setAllStatus(treeValue);
    }, [cursor]);

    const list = flatten(data);
    return (
        <>
            {<Button id='status-list' variant="contained" type="submit" onClick={onToggleAll}>
                {allStatus.text}
            </Button>}
            {list}
        </>
    )
}
JSONTree.propTypes = {
    data: PropTypes.object.isRequired
}
export default memo(JSONTree);
// Expanding and collapsing each level on JSON tree is available, and also possible to collapse and expand all tree like in the AC requirements

//--- we can use typeof for checking if element is an Object but this approach doesn't constist сhecking of null value! 
/**
 * I have used regular json file in a such structure :
 *
 * {
    "textbox_value": {
        "name": "dfsf"
    },
    "another_textbox_value": "sdfsdf",
    "textbox_value_again": true,
    "another_textbox_value_again": {
        "age": 12,
        "flow": "firsr",
        "add": {
            "fdgdf": "fsdf"
        }
    }
 }
 *
 */
// Task 2 was understood by me like creating own hook to parsing json object and do all manipulation with them.
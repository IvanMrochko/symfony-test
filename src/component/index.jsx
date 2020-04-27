import React, { useState, useEffect, useMemo } from 'react'
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import PropTypes from 'prop-types'
import { useJSON } from './useObject';
import './index.scss';
import { log } from 'util';

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


    const onToggle = (node) => {
        setCursor({ [node]: !cursor[node] });
    }
    const onToggleAll = () => {
        setAll(allStatus.status);
    }

    function flatten(object) {
        const strNodeKey = JSON.stringify(object);
        const isVisible = cursor[strNodeKey] && 'active';
        const toggleButton = cursor[strNodeKey] ?
            <RemoveIcon color="primary" fontSize="small" /> :
            <AddIcon color="primary" fontSize="small" />

        return (
            <ul className="list" >
                <span className="list__icon" onClick={() => onToggle(strNodeKey)}>
                    {toggleButton}
                    <span>Objects inside: {Object.keys(object).length} </span>
                </span>
                <div className={`list-item ${isVisible}`} key={object}>
                    {Object.entries(object).map(([key, value], index) => {
                        if (Object.getPrototypeOf(value).constructor === Object || Array.isArray(value)) {
                            return flatten(value);
                        } else {
                            return (
                                <li key={key} className="list-item__element">
                                    <span>key:</span>{key}
                                    <span>value:</span>{value.toString()}
                                </li>
                            )
                        }
                    })}
                </div>
            </ul>
        )
    }
    useEffect(() => {
        if (!Object.keys(cursor).every((key) => cursor[key])) {
            setAllStatus(treeStatus.expandAll)
        } else {
            setAllStatus(treeStatus.colapseAll)
        }
    }, [cursor])

    const list = flatten(data);
    const isVisible = Object.keys(cursor).some((key) => cursor[key]);
    return (
        <>
            {isVisible 
            && <Button variant="contained" type="submit" onClick={onToggleAll}>
                {allStatus.text}
            </Button>}
            {list}
        </>
    )
}
JSONTree.propTypes = {
    data: PropTypes.object.isRequired
}
export default React.memo(JSONTree);
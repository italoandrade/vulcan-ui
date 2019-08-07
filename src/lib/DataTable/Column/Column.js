import React, {useContext, useEffect} from 'react'
import {classNames, Icon} from 'vulcan-ui'
import {Context} from '../DataTable'
import './Column.scss'

const directions = ['asc', 'desc', null]

const Column = ({children, name, rightAligned, centerAligned, search, searchCustomInput, sortable}) => {
    const {isSearchActive, setIsSearchActive, onTrigger, filter, setFilter} = useContext(Context)
    const columns = filter && filter.columns

    const className = classNames(
        'vui-DataTable-Column',
        rightAligned && 'right-aligned',
        centerAligned && 'center-aligned',
        sortable && 'sortable',
        search && 'search'
    )

    if (sortable && !name) {
        console.error('[DataTable.Column] The property "name" is required for sortable columns')
    }

    if (search && !name) {
        console.error('[DataTable.Column] The property "name" is required for search columns')
    }

    useEffect(() => {
        if (sortable && name) {
            setFilter(f => ({
                ...f,
                columns: {...f.columns, [name]: {...f.columns[name], direction: null}}
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, sortable])

    useEffect(() => {
        if (name) {
            setFilter(f => ({
                ...f,
                columns: {...f.columns, [name]: {...f.columns[name], direction: null, searchCustomInput}}
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, searchCustomInput])

    const handleClickSearch = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (search) {
            setIsSearchActive(!isSearchActive)
        }
    }

    const handleClick = () => {
        if (sortable) {
            const newColumns = {...columns}
            const currentDirection = newColumns[name].direction
            newColumns[name].direction = directions[(directions.indexOf(currentDirection) + 1) % 3]
            setFilter(f => ({
                ...f,
                columns: newColumns
            }))
            onTrigger('columns', newColumns)
        }
    }

    let sorting
    if (sortable && columns[name]) {
        sorting = <Icon className={classNames('order-icon', columns[name].direction)} name='arrowDown'/>
    }

    const searchButton = <Icon
        className={classNames(
            'search-icon search',
            columns[name] && columns[name].query ? 'active' : ''
        )}
        name='search'
        onClick={handleClickSearch}
    />

    return (
        <th className={className} onClick={handleClick} name={name}>
            {rightAligned &&
            <>
                {sortable && sorting}
                {search && searchButton}
            </>
            }
            {children}
            {!rightAligned &&
            <>
                {search && searchButton}
                {sortable && sorting}
            </>
            }
        </th>
    )
}

export default Column

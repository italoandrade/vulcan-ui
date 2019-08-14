import React, {useEffect, useRef} from 'react'
import TextField from '../TextField'

const Autosize = ({setRef, ...props}) => {
    const innerSetRef = useRef(null)

    const resize = (target) => {
        target.style.height = 'auto'
        target.style.height = target.scrollHeight + 1 + 'px'
    }

    const handleKeyUp = ({target}) => {
        resize(target)
    }

    useEffect(() => {
        if (setRef) {
            setRef.current = innerSetRef.current
        }
        const target = innerSetRef.current.element
        resize(target)
    }, [setRef])

    useEffect(() => {
        const handleResize = () => {
            const target = innerSetRef.current.element
            resize(target)
        }

        handleResize()
        window.addEventListener('scroll', handleResize)
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('scroll', handleResize)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <TextField
            {...props}
            setRef={innerSetRef}
            onInput={handleKeyUp}
            inputElement={props => <textarea rows='2' {...props} />}
        />
    )
}

export default Autosize

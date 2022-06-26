import React, { useState, useEffect, useCallback, useMemo} from 'react'

const useWidth = () => {
    const [width, setWidth] = useState(window.innerWidth || document.body.clientWidth)
    const handleResize = useCallback(() => setWidth(window.innerWidth), [setWidth]);

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener(`resize`, handleResize)
    })

    return useMemo(() => width, [width])
}

export default useWidth
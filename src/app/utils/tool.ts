import { useEffect, useRef } from 'react'

/*
* example:
    const OneSecondTimer = props => {
    const [seconds, setSeconds] = React.useState(0);
    useTimeout(() => {
    setSeconds(seconds + 1);
    }, 1000);

    return <p>{seconds}</p>;
};
*/
export const useTimeout = (callback: () => void, delay: number | null): void => {
    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        if (delay !== null) {
            const id = setTimeout(() => savedCallback.current(), delay)
            return () => clearTimeout(id)
        }
    }, [delay])
}

export const useInterval = (callback: () => void, delay: number | null): void => {
    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        if (delay !== null) {
            const id = setInterval(savedCallback.current, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}

export const formatMoney = (s: string | number, n: number): number | string => {
    n = n > 0 && n <= 20 ? n : 0
    s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
    const l = s.split('.')[0].split('').reverse(),
        r = s.split('.')[1]
    let t = ''
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '')
    }

    const res = t.split('').reverse().join('') + `${r ? '.' + r : ''}`

    return res !== 'NaN' ? res : Number(0).toFixed(n)
}

export default formatMoney

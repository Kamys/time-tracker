import * as moment from 'moment'
import { useEffect, useRef } from 'react'

export const formatSecond = second => {
  return moment()
    .startOf('day')
    .seconds(second)
    .format('H:mm:ss')
}

export default function useInterval(callback, delay, ...args) {
  const savedCallback = useRef(null)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      savedCallback.current(...args)
    }
    if (delay !== null && delay !== undefined) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
    return null
  }, [delay])
}

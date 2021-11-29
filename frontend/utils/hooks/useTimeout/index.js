import { useCallback, useState, useRef, useEffect } from 'react'

export default function useTimeout(callback, delay) {
    const callbackRef = useRef(callback)
    const timeoutRef = useRef()
  
    useEffect(()=> {
      callbackRef.current = callback
    },[callback, delay])
  
    const set = useCallback(()=> {
      timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
    },[])
  
    const clear = useCallback(()=> {
      timeoutRef.current && clearTimeout(timeoutRef.current)
    },[])
  
    useEffect(()=> {
      set()
      return clear
    }, [delay, set, clear])
  
    const reset = useCallback(()=> {
      clear()
      set()
    }, [clear, set])
  
    return { reset, clear }
  
  }
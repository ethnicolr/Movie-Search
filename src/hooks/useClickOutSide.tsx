import React, { useEffect } from 'react'

export function useClickOutSide(
  ref: React.RefObject<HTMLElement>,
  callbackOut: () => void,
  callbackOutInner?: () => void
): void {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callbackOut()
    } else {
      callbackOutInner && callbackOutInner()
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  })
}

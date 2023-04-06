import Image from 'next/image'
import { useState } from 'react'
import icon from '../assets/icon.png'

interface ICategory {
  title: string
  onClick: () => void
}

export const CategoryItem = (props: ICategory) => {
  const [isHover, setIsHover] = useState(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  const boxStyle = {
    color: 'white',
    minWidth: '240px',
    height: '50px',
    padding: '8px 46px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backgroundColor: isHover ? '#f43f5e' : 'transparent',
  }

  return (
    <button
      style={boxStyle}
      className="shadow-xl"
      onClick={props.onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* <img src={icon} alt="Icon" style={iconStyle} /> */}
      {props.title}
    </button>
  )
}

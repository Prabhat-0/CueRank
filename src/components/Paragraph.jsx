import React from 'react'

const Paragraph = ({text,textSize='text-base'}) => {
  return (
    <p className={`font-inter font-regular ${textSize}  text-inactive`}>
        {text}
    </p>
  )
}

export default Paragraph
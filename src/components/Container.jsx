import React from 'react'

const Container = ({children ,id,parentContainerStyle,childContaineStyle}) => {
  return (
        <section id={id} aria-label={`${id} section`} className={`relative isolate w-full ${parentContainerStyle && parentContainerStyle}`}>
            <div className={`mx-auto flex w-full max-w-[1200px] flex-col items-start justify-between ${childContaineStyle && childContaineStyle}`}>
                {children}
            </div>
        </section>
  )
}

export default Container
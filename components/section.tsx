import { isValidMotionProp, motion } from 'framer-motion'
import { chakra, forwardRef } from '@chakra-ui/react'
import React from 'react'

const StyledDiv = motion(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    )

    return <chakra.div ref={ref} {...chakraProps} />
  })
)

type SectionProps = {
  children: React.ReactNode
}

const Section = ({ children }: SectionProps) => (
  <StyledDiv
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
    mb={6}
  >
    {children}
  </StyledDiv>
)

export default Section

import React from 'react'
import { motion } from 'framer-motion'

const Motion = () => {
  return (
   <motion.div 
   animate = {{ rotate : 360 }}
   transiton = {{ duration : 1  , ease: "linear"}}
   
   style={square}/>
  )
}

export default Motion

const square = {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    borderRadius : "4%",
    marginLeft : "50%",
    marginTop : "20%",
}
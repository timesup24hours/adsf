import React, { Component } from 'react'
// import FoldedCornerEffect from './foldedCornerEffect/FoldedCornerEffect'<FoldedCornerEffect></FoldedCornerEffect>
// import VideoBackground from './videoBackground/VideoBackground' // <VideoBackground></VideoBackground>
import TriangeleAnimationSVG from './triangeleAnimationSVG/triangeleAnimationSVG'
import CaptainAmericaShieldSVG from './CaptainAmericaShieldSVG/CaptainAmericaShieldSVG'
import FlyInText from './flyInText/FlyInText'
import TriggerSvgWord from './TriggerSvgWord/TriggerSvgWord'
import KnockoutMaskEffect from './KnockoutMaskEffect/KnockoutMaskEffect'
import AnimatedLetter from './AnimatedLetter/AnimatedLetter'

class Learning extends Component {

  render() {
    return (
      <div className='Learning' style={{ height: '1000vh', width: '100%', marginTop: '50px' }}>
        <FlyInText />
        <TriggerSvgWord />
        <KnockoutMaskEffect />
        <AnimatedLetter />
        <TriangeleAnimationSVG />
        <CaptainAmericaShieldSVG />
      </div>
    )
  }
}

export default Learning

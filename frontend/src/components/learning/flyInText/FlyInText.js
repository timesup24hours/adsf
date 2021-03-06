import React, { Component } from 'react'

class FlyInText extends Component {

  componentDidMount() {
    this.timeout = setTimeout(function () {
      document.querySelector('.fly-in-text').classList.remove('fly-hidden')
    }, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    return (
      <div className='FlyInText'>
        <ul className="fly-in-text fly-hidden">
          <li>W</li>
          <li>E</li>
          <li>L</li>
          <li>C</li>
          <li>O</li>
          <li>M</li>
          <li>E</li>
        </ul>
      </div>
    )
  }
}

export default FlyInText

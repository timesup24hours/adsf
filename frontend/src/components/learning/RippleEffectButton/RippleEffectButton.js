import React, { Component } from 'react'

class RippleEffectButton extends Component {

  componentDidMount() {
    let buttons = document.getElementsByTagName('button');

    Array.prototype.forEach.call(buttons, function (b) {
        b.addEventListener('click', createRipple);
    });

    function createRipple (e) {
      let circle = document.createElement('div');
      this.appendChild(circle);

      let d = Math.max(this.clientWidth, this.clientHeight);

      circle.style.width = circle.style.height = d + 'px';

      let rect = this.getBoundingClientRect();
      circle.style.left = e.clientX - rect.left -d/2 + 'px';
      circle.style.top = e.clientY - rect.top - d/2 + 'px';


      circle.classList.add('ripple');
      setTimeout(() => this.removeChild(circle), 500)
    }
  }

  render() {
    return (
      <div className='RippleEffectButton'>
        <button className='ripple'>Click Me!</button>
      </div>
    )
  }
}

export default RippleEffectButton

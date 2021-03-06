import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import { injectStyle } from '../../utils';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);

    // define keyframe in component
    const keyframesStyle1 = `
      @-webkit-keyframes pulse {
        0%   { background-color: #fecd6d; }
        25%  { background-color: #ef7b88; }
        50%  { background-color: #acdacf; }
        75%  { background-color: #87c3db; }
        100% { background-color: #fecd6d; }
      }
    `;

    const keyframesStyle2 = `
      @-webkit-keyframes btnOpacity {
        0%   { opacity: 0; }
        100% { opacity: 1; }
      }
    `;

    // append css in style sheet
    injectStyle(keyframesStyle1);
    injectStyle(keyframesStyle2);

    this.state = {
      style: {
        button: {
          position: 'absolute',
          top: '-15px',
          height: '50px',
          width: '50px',
          left: '205px',
          transition: 'background-color 300ms linear', // eslint-disable-line
          transition: 'opacity 3000ms linear', // eslint-disable-line
          WebkitAnimation: 'pulse 2s linear infinite, btnOpacity 3000ms linear forwards 1000ms',
          opacity: '0',
        },
        icon: {
        }
      },
      navShow: false,
    }

  }

  static contextTypes = {
    router: PropTypes.object,
  }

  // resize function for event listener
  resizeListener = () => {
    if(window.matchMedia("(max-width: 500px)").matches) {
      this.setState({ navShow: true })
      document.querySelector('.LeftSideBar').style.left = '-220px'
    } else {
      this.setState({ navShow: false })
      document.querySelector('.LeftSideBar').style.left = '0px'
    }
  }

  componentDidMount() {
    this.resizeListener()
    window.addEventListener('resize', this.resizeListener)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener)
  }

  // onclick function for button and mask. hide and show the left side bar
  handleShowLeftSideBar = (e) => {
    if(document.querySelector('.LeftSideBar').style.left !== '0px') {
      document.querySelector('.LeftSideBar').style.left = '0px'
      document.querySelector('.LeftSideBar-mask').style.display = 'block'
      this.setState({ navShow: false })
    } else {
      document.querySelector('.LeftSideBar').style.left = '-220px'
      document.querySelector('.LeftSideBar-mask').style.display = 'none'
      this.setState({ navShow: true })
    }
  }

  render() {
    const { style } = this.state

    const menu = this.props.menu.categories ? this.props.menu.categories.map((d, di) => {
      return (<ListItem
                style={{ fontSize: '14px', hoverColor: 'grey' }}
                key={di}
                primaryText={d.name}
                initiallyOpen={false}
                primaryTogglesNestedList={false}
                nestedItems={
                  d.category.map((c, ci) => {
                    return c.name ?
                    (<ListItem
                        onClick={() => this.context.router.push(`/shop/${d.to}/${c.to}`)}
                        style={{ fontSize: '12px' }}
                        key={ci}
                        primaryText={c.name}
                     />) : null
                  })

                }
               />)
    }) : null

    return (
      <div className='LeftSideBar'>
        <div className='LeftSideBar-mask' onClick={() => this.handleShowLeftSideBar()}></div>
        {this.state.navShow
          ? <FloatingActionButton
              id='LeftSideBar-btn'
              style={style.button}
              iconStyle={style.icon}
              onClick={(e) => this.handleShowLeftSideBar(e)}
            >
              <ArrowForward style={{ transform: 'rotate(45deg)' }} />
            </FloatingActionButton>
          : null
        }
        <br />
          <List>
            <Subheader>Departments</Subheader>
            {menu}
          </List>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  menu: state.menu,
})
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBar)

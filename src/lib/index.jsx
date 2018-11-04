import React, {Component} from 'react';
import './index.css'

class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classes: []
    }
  }

  static getDerivedStateFromProps (props, state) {
    if (state.classes.length) return null

    const classes = createClassesArray(props)
    return {classes}

    function createClassesArray (props) {
      const { children } = props
      if (!Array.isArray(children)) return []

      let id =  Math.floor((children.length - 1) / 2)
      let direction = 'before'
      let classesArray = []

      children.forEach(() => {
        if (id === 0) direction = 'current'
        if (id < 0) direction = 'after'

        classesArray.push({classname: direction, id: Math.abs(id)})
        id--
      })

      return classesArray
    }
  }



  moveSlide = (direction, count) => {
    console.log('click')
    let { classes } = this.state

    if (direction === 'after') {
      let start = classes.length - count
      let last = classes.splice(start,count)
      classes = [...last, ...classes]
    } else {
      let first = classes.splice(0, count)
      classes = [...classes, ...first]
    }
    this.setState({classes})
    console.log(classes)

  }

  sliderRef = (node) => {this.slider = node}

  renderSlides = () => {
    const { children, transition } = this.props
    console.log(children)
    if (!Array.isArray(children)) return <div></div>

    const { classes } = this.state

    return children.map((img, index) => {
      let classNames = 'slider3d__item slider3d__item--' + classes[index].classname + ' slider3d__item--' + classes[index].id
      let direction = classes[index].classname

      return (
        <li key={index}
            className={classNames}
            style={{transition: `${transition}ms`}}
            onClick={() => this.moveSlide(direction, classes[index].id)}
        >

          {
            classes[index].id < 6 && classes[index].id > -6 ?
              img
              :
              <img data-src={img.props.src} alt={img.props.src} style={{display: 'block'}} />
          }
        </li>
      )}
    )
  }

  render () {

    return (
      <div className="slider3d">
        <ul className="slider3d__items">
          {this.renderSlides()}
        </ul>

        <nav>
          <button className="slider3d__button slider3d__button--left" onClick={() => this.moveSlide('before', 1)}></button>
          <button className="slider3d__button slider3d__button--right" onClick={() => this.moveSlide('after', 1)}></button>
        </nav>
      </div>
    )
  }
}


export default Carousel
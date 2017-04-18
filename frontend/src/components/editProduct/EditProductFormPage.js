import React, { Component } from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/CircularProgress'
import * as productActions from '../../store/actions/productActions'
import EditProductForm from './EditProductForm'

class EditProductFormPage extends Component {

  componentDidMount() {
    this.props.getCurrentEditProductsByOwner(this.props.params.id)
  }

  render() {
    return this.props.product.currentEditProduct && this.props.menu.categories ? (
      <div className='EditProductFormPage'>
        <EditProductForm
          id={this.props.params.id}
          currentEditProduct={this.props.product.currentEditProduct}
          menu={this.props.menu}
        />
      </div>
    ) : <div className="flexCenter"><CircularProgress size={50} thickness={3}/></div>
  }
}

const mapStateToProps = state => ({
  menu: state.menu,
  product: state.product,
})
const mapDispatchToProps = dispatch => ({
  getCurrentEditProductsByOwner: payload => dispatch(productActions.getCurrentEditProductsByOwner(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProductFormPage)
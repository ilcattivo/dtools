import React, { Component } from 'react';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import TopBanner from '../../components/top-banner';
import CatalogMenu from '../../components/catalog-menu';
import { getToolTypes, getOperationTypes } from '../../actions/product-actions';
import './style.sass';

class PageLayout extends Component {
  componentDidMount() {
    const { getToolTypes, getOperationTypes } = this.props;
    getToolTypes();
    getOperationTypes();
  }

  render() {
    const { toolTypes, operationTypes } = this.props;
    const { name, descr, img } = this.props.header;

    return (
      <div className='page-layout'>
        <TopBanner title={name} descr={descr} img={img} />
        <div className='page-layout__wrapper'>
          <div className='page-layout__left'>
            {toolTypes.length > 0 && operationTypes.length > 0 && (
              <CatalogMenu list={[toolTypes, operationTypes]} />
            )}
          </div>
          <Divider orientation='vertical' flexItem style={{ width: '3px' }} />
          <div className='page-layout__right'>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  toolTypes: state.productsReducer.toolTypes,
  operationTypes: state.productsReducer.operationTypes,
});

const mapDispatchToProps = { getToolTypes, getOperationTypes };

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);

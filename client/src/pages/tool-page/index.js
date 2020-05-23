import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageLayout from '../../hoc/page-layout';
import ToolImages from './components/tool-images/tool-images';
import MaterialsList from './components/materials-list/materials-list';
import { getToolById, clearTool } from '../../actions/product-actions';
import './style.sass';

class ToolPage extends Component {
  componentDidMount() {
    this.fetchTool();
  }

  fetchTool = () => {
    const { getToolById, clearTool } = this.props;

    clearTool();

    const toolId = this.props.match.params.id;
    getToolById(toolId);
  };

  renderToolInfo = (tool) => {
    const { name, title, detailedDescr, images, materials } = tool;

    return (
      <main className='tool'>
        <h2 className='tool__header'>{name}</h2>
        <div className='tool__wrapper'>
          <div className='tool__left'>
            <div>
              <ToolImages images={images} />
            </div>
          </div>
          <div className='tool__right'>
            <h3 className='tool__title'>{title}</h3>
            <p className='tool__descr'>{detailedDescr}</p>
            <MaterialsList list={materials} />
          </div>
        </div>
      </main>
    );
  };

  render() {
    const { tool } = this.props;

    return (
      <PageLayout
        header={{
          ...tool,
          img: '/images/headers/boring-and-reaming-tools-header.jpg',
        }}>
        {tool && this.renderToolInfo(tool)}
      </PageLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  tool: state.productsReducer.tool,
});

const mapDispatchToProps = {
  getToolById,
  clearTool,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolPage);

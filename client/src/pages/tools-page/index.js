import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from '../../components/link';

import PageLayout from '../../hoc/page-layout';
import ImgNotAvailable from '../../components/img-not-available';
import {
  getOperationTypeByShortname,
  getToolsByOperationType,
} from '../../actions/product-actions';
import './style.sass';

class ToolsPage extends Component {
  componentDidMount() {
    this.fetchTools();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.subcategory !== prevProps.match.params.subcategory
    ) {
      this.fetchTools();
    }
  }

  fetchTools = () => {
    const operationType = this.props.match.params.subcategory;
    const { getOperationTypeByShortname, getToolsByOperationType } = this.props;
    getOperationTypeByShortname(operationType).then((res) =>
      getToolsByOperationType(res.payload._id)
    );
  };

  render() {
    const { operationType, tools } = this.props;

    return (
      <PageLayout
        header={{
          ...operationType,
          img: '/images/headers/boring-and-reaming-tools-header.jpg',
        }}>
        {
          <main className='tools'>
            <h2 className='tools__header'>Инструмент для любой задачи</h2>
            <ul className='tools__list'>
              {tools &&
                tools.map((tool) => {
                  const { _id, name, descr, images } = tool;
                  const thumb = images ? images[0] : null;

                  return (
                    <li className='tools__item' key={_id}>
                      <div className='tools__card'>
                        {thumb ? (
                          <img className='tools__img' src={thumb} alt={name} />
                        ) : (
                          <ImgNotAvailable
                            className='tools__img'
                            fontSize='1.7rem'
                          />
                        )}
                        <Link
                          to={`/products/tool/${_id}`}
                          className='tools__link'>
                          {name}
                        </Link>
                        <div className='tools__descr'>{descr}</div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </main>
        }
      </PageLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  operationType: state.productsReducer.operationType,
  tools: state.productsReducer.tools,
});

const mapDispatchToProps = {
  getOperationTypeByShortname,
  getToolsByOperationType,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsPage);

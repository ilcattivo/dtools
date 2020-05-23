import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from '../../components/link';
import PageLayout from '../../hoc/page-layout';
import ImgNotAvailable from '../../components/img-not-available';
import {
  getToolTypeByShortname,
  getTooltypeOperations,
} from '../../actions/product-actions';
import './style.sass';

class ToolCategory extends Component {
  componentDidMount() {
    const toolTypeName = this.props.match.params.category;
    const { getToolTypeByShortname, getTooltypeOperations } = this.props;

    getToolTypeByShortname(toolTypeName).then((res) =>
      getTooltypeOperations(res.payload._id)
    );
  }

  render() {
    const { toolType, tooltypeOperations } = this.props;

    return (
      <PageLayout
        header={{
          ...toolType,
          img: '/images/headers/turning-tools-header.jpg',
        }}>
        <main className='operation-types'>
          <h2 className='operation-types__header'>
            Инструмент для любой задачи
          </h2>
          <p className='operation-types__descr'>
            Перейдите по приведенным ниже ссылкам, чтобы ознакомиться с полным
            ассортиментом продукции, рекомендациями по применению и
            обрабатываемыми материалами
          </p>
          <ul className='operation-types__list'>
            {tooltypeOperations.map((opType) => {
              const { name, shortname, image } = opType;
              return (
                <li className='operation-types__item' key={name}>
                  <div className='operation-types__card'>
                    {image ? (
                      <img
                        className='operation-types__img'
                        src={image}
                        alt={name}
                      />
                    ) : (
                      <ImgNotAvailable className='operation-types__img' />
                    )}
                    <Link
                      to={`/products/turning-tools/${shortname}`}
                      className='operation-types__link'>
                      {name}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </main>
      </PageLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  toolType: state.productsReducer.toolType,
  tooltypeOperations: state.productsReducer.tooltypeOperations,
});

const mapDispatchToProps = { getToolTypeByShortname, getTooltypeOperations };

export default connect(mapStateToProps, mapDispatchToProps)(ToolCategory);

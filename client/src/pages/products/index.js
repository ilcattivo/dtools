import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PageLayout from '../../hoc/page-layout';
import ImgNotAvailable from '../../components/img-not-available';
import { getToolTypes } from '../../actions/product-actions';
import './style.sass';

class Products extends Component {
  componentDidMount() {
    this.props.getToolTypes();
  }

  render() {
    const toolTypes = this.props.toolTypes;
    const header = {
      name: 'Металлорежущий инструмент',
      descr:
        'Для сохранения лидерских позиций в постоянно меняющемся мире промышленного производства совершенно необходимо стремится быть лучшим в области резания металлов. Прекрасно понимая реалии вашей отрасли, мы предлагаем решения, отвечающие амбициям вашей компании. Вместе мы формируем будущее промышленности.',
      img: '/images/headers/boring-and-reaming-tools-header.jpg',
    };

    return (
      <PageLayout header={header}>
        <main className='tool-types'>
          <ul className='tool-types__list'>
            {toolTypes &&
              toolTypes.map(({ name, shortname, descr, image }) => (
                <li key={name} className='tool-types__item'>
                  <div className='wide-card'>
                    <div className='wide-card__left'>
                      {image ? (
                        <img
                          className='wide-card__img'
                          src={image}
                          alt={name}
                        />
                      ) : (
                        <ImgNotAvailable className='wide-card__img' />
                      )}
                    </div>
                    <div className='wide-card__right'>
                      <h3 className='wide-card__title'>{name}</h3>
                      <p className='wide-card__descr'>{descr}</p>
                      <Link
                        className='wide-card__link'
                        to={`/products/${shortname}`}>
                        Перейти к продукции
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </main>
      </PageLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    toolTypes: state.productsReducer.toolTypes,
  };
};

const mapDispatchToProps = {
  getToolTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);

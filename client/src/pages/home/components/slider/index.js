import React from 'react';
import SlickSlider from 'react-slick';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Link from '../../../../components/link';
import './style.sass';

class Slider extends React.Component {
  state = {
    slides: [
      {
        img:
          '/images/slider/latest-cutting-tools-and-solutions-banner-20-1.jpg',
        title: 'С гордостью представляем наши цельные режущие инструменты',
        descr: 'Подберите правильный осевой инструмент для своего производства',
        linkTitle: 'Подробная информация',
        linkTo: '',
      },
      {
        img: '/images/slider/coroplus.jpg',
        title: 'Будущее производства уже наступило',
        descr: 'Цифровая обработка с CoroPlus®',
        linkTitle: 'Узнайте, как сократить потери на вашем производстве',
        linkTo: '',
      },
      {
        img: '/images/slider/tool-up-for-faster-payback.jpg',
        title:
          'Сократите сроки окупаемости станка с помощью нашего инструмента',
        descr:
          'Мы не просто режем металл.Мы режем сроки окупаемости ваших станков.',
        linkTitle: 'Сократите срок окупаемости своих станков',
        linkTo: '',
      },
    ],
  };

  render() {
    const settings = {
      arrows: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      className: 'slides',
    };

    return (
      <SlickSlider {...settings}>
        {this.state.slides.map((el, i) => (
          <div key={i} className='slides__slide'>
            <div
              className='slides__image'
              style={{
                backgroundImage: `url(${el.img})`,
              }}>
              <div className='slides__info'>
                <h2 className='slides__title'>{el.title}</h2>
                <p className='slides__descr'>{el.descr}</p>
                <Link className='slides__link link--small link--underline'>
                  <ArrowForwardIosIcon
                    className='slides__link-arrow'
                    style={{
                      height: '1rem',
                    }}
                  />
                  {el.linkTitle}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </SlickSlider>
    );
  }
}

export default Slider;

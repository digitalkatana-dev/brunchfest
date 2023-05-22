import Slider from 'react-slick';
import './carousel.scss';

const Carousel = ({ pics }) => {
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	return (
		<Slider {...settings} className='slide' autoplay>
			{[1, 2, 3, 4, 5, 6].map((item, i) => (
				<div className='pic' key={i}>
					<h3>{item}</h3>
				</div>
			))}
		</Slider>
	);
};

export default Carousel;

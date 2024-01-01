import React from 'react'
import Login from './Login'
import Layout from '../Layout/Layout'
import Featured from '../Component/Featured'
import { cards, projects } from '../Data'
import Card from '../Component/Card'
import ProjectCard from '../Component/ProjectCard'
import { useGlobalContext } from '../UserContext/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomePageContent from '../Component/HomePageContent'


const Home = () => {
  const {tradesmanProfiles} = useGlobalContext();
  const CustomPrevArrow = (props) => (
    <span {...props} className="text-vw text-black absolute cursor-pointer top-[8vw] left-0vw z-50">
    <FontAwesomeIcon icon={faArrowLeft} className='text-2vw text-black  rounded-full hover:bg-gray-100 bg-white p-[0.7vw] text-center' />
  </span>);
  const CustomNextArrow = (props) => (
      <span {...props} className="text-vw text-black absolute cursor-pointer top-[8vw] right-vw">
    <FontAwesomeIcon icon={faArrowRight} className='text-2vw text-red-800 rounded-full hover:bg-gray-100 bg-white p-[0.7vw] text-center' />
  </span> );

const settings = { dots: false, prevArrow: <CustomPrevArrow />, nextArrow: <CustomNextArrow />, arrows: true, infinite: true, speed: 500, slidesToShow: 4, slidesToScroll: 1, autoplay: true, autoplaySpeed: 3000 };

  return (
    <div>
      <Layout>
        <Featured />
        <div className="pl-2vw">
        <div className="grid w-full gap-vw m-vw  grid-cols-1">
        <Slider {...settings}>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </Slider>
      </div>
        </div>
   <HomePageContent />
      <div className="grid w-full gap-vw m-vw  grid-cols-1">
      <Slider {...settings}>
        {tradesmanProfiles?.map((card) => (
          <ProjectCard key={card.id} username={card?.username} image={card?.image} occupation={card?.occupation} />
        ))}
      </Slider>
      </div>
      </Layout>
    </div>
  )
}

export default Home

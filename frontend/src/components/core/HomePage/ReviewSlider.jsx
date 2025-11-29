import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { apiConnector } from '../../../services/apiconnector';
import { ratingsEndpoints } from '../../../services/apis';
import { useSelector } from 'react-redux';
import RatingStars from '../../common/RatingStars';

const ReviewSlider = () => {
  const [Reviews, setReviews] = useState([])
  const theme = useSelector((state) => state.theme)
  const truncateWords = 15;
  useEffect(() => {
    const fetchAllReviews = async () => {
      const response = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)

      if (response?.data?.success) {
        setReviews(response?.data?.data)

      }
    }
    fetchAllReviews()
  }, [])
  // console.log(Reviews)
  // if (loading) return <div>Loading reviews...</div>
  if (!Reviews || !Reviews.length) return <div className='text-center'>No reviews found</div>
  return (
    <div className='text-richblack-5 relative'>
      <div className="absolute w-[150px] h-[250px] top-[-14%] z-50 background-[linear(180deg,#f4f8ff,#fff0)]">  </div>
      <div className='my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent'>
        <Swiper
          allowSlidePrev={true}
          slidesPerView={1}
          loop={true}
          spaceBetween={20}
          pagination={false}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper md:pt-5 w-full"
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          style={{
            "--swiper-navigation-size": "20px",
          }}
          freeMode={false}
          rewind={false}
          centeredSlides={true}
          navigation={false}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.1 },
          }}
        >

          {
            Reviews.map((review, index) => (
              <SwiperSlide key={index}>

                <div className='flex flex-col gap-3 dark:bg-dark-richblack-800 bg-light-richblack-800 p-3 text-[14px] pt-10 pl-10 text-light-richblack-25 dark:text-dark-richblack-25  rounded-lg min-h-[200px]'>
                  <div className='flex items-center gap-4'>
                    <img loading="lazy" src={review?.user?.image ?? `https://api.dicebear.com/6.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`}
                      alt={`${review?.user?.firstName} ${review?.user?.lastName}`}
                      className="h-9 w-9 object-cover rounded-full"
                    />
                    <div className='flex flex-col'>
                      <h1 className='font-semibold text-light-richblack-5 dark:text-dark-richblack-5'>
                        {`${review?.user?.firstName} ${review?.user?.lastName}`}
                      </h1>
                      <h2 className="text-[12px] font-medium  text-dark-richblack-500">{review?.course?.courseName}</h2>
                    </div>
                  </div>
                  <p className='font-medium dark:text-dark-richblack-25 text-light-richblack-25'>
                    {review?.review.split(" ").length > truncateWords ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")}...` : `${review?.review}`}
                  </p>
                  <div className='flex items-center gap-2'>
                    <h3 className='font-semibold dark:text-dark-yellow-100 text-red-500 text-lg'>{review?.rating.toFixed(1)}</h3>
                    <RatingStars Review_Count={review?.rating} />
                  </div>
                </div>

              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
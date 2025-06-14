import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
// import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import Course_Card from './Course_Card'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from 'react-redux';


const CourseSlider = ({ Courses }) => {
    const theme = useSelector((state) => state.theme)
    return (
        <>
            { 

                Courses?.length ? ( // Show Swiper if courses exist
                    <Swiper
                        // slidesPerView={1}
                        spaceBetween={25}
                        loop={true}
                        modules={[Autoplay]}
                        centeredSlides={true}
                        breakpoints={{
                            1024: { slidesPerView: 3 },            
                            768: { slidesPerView: 2 },
                            640: { slidesPerView: 1 }, 
                        }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false
                        }}
                        pagination={{
                            clickable: true
                        }}
                        className='max-h-[30rem] md:w-full w-[90%] mx-auto'>                 
                        {
                            Courses.map((course, index) => (
                                <SwiperSlide key={index}>
                                    <Course_Card course={course} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                ) : ( // Show Skeleton when loading (no data)
                    <div className='flex gap-4 overflow-hidden'>
                        {[...Array(3)].map((_, idx) => (
                            <SkeletonTheme key={idx} baseColor={`${theme=== 'dark' ? "#2C333F" : ""}`} highlightColor={`${theme==='dark'?"#161D29" :""}`}>
                               <div className="w-full">
                                    <Skeleton className="md:h-[200px] lg:w-[400px] h-[100px] w-[200px] rounded-xl" />
                                    <Skeleton className=" md:h-[20px] w-[70px] rounded-md" />
                                    <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
                                    <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
                                </div>
                            </SkeletonTheme>
                        ))}
                    </div>
                )
            }


        </>
    )
}

export default CourseSlider
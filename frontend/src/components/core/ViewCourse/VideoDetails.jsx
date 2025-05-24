import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI'
import { setCompletedLectures, updateCompletedLectures } from '../../../slice/viewCourseSlice'
// import { toast } from 'react-hot-toast'
import ReactPlayer from 'react-player'
import IconBtn from '../../common/IconBtn'
import Certificate from '../../common/Certificate'

const VideoDetails = () => {

  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const playerRef = useRef(null)
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, totalNoOfLectures, completedLecture } = useSelector((state) => state.viewCourse)
  const [previewSource, setPreviewSource] = useState("")
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [videoData, setVideoData] = useState([])
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState();
  const [showCertificate, setShowCertificate] = useState(false)

  useEffect(() => {
    ; (async () => {
      setLoading(true)
      if (!courseSectionData.length) return
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
      } else {
        // console.log("courseSectionData", courseSectionData)
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )
        // console.log("filteredData", filteredData)
        const filteredVideoData = filteredData?.[0]?.SubSection.filter(
          (data) => data._id === subSectionId
        )
        // console.log("filteredVideoData", filteredVideoData)
        setVideoData(filteredVideoData[0])
        setPreviewSource(courseEntireData.courseThumbnail)
        setVideoEnded(false)
        setLoading(false)
      }
    })()

  }, [courseSectionData, courseEntireData, location.pathname])

  const handleVideoReady = () => {
    setIsVideoReady(true)
  }

  const handleVideoError = (error) => {
    console.error("Video Playback error : ", error)
    setIsVideoReady(false)
  }

  const ifFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
    const subSectionIndex = courseSectionData[currentSectionIndex].SubSection.findIndex((data) => data._id === subSectionId)

    if (currentSectionIndex === 0 && subSectionIndex === 0)
      return true
    else
      return false
  }
  const ifLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
    const noOfSubSection = courseSectionData[currentSectionIndex].SubSection.length;
    const subSectionIndex = courseSectionData[currentSectionIndex].SubSection.findIndex((data) => data._id === subSectionId)

    if (currentSectionIndex === courseSectionData.length - 1 &&
      subSectionIndex === noOfSubSection - 1)
      return true
    else
      return false
  }
  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
    const noOfSubSection = courseSectionData[currentSectionIndex].SubSection.length;
    const subSectionIndex = courseSectionData[currentSectionIndex].SubSection.findIndex((data) => data._id === subSectionId)

    if (subSectionIndex !== noOfSubSection - 1) {
      // goto next subsection
      const nextSubSectionId = courseSectionData[currentSectionIndex].SubSection[currentSectionIndex + 1]._id
      // navigate to this video
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    } else {
      // goto next section
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].SubSection[0]._id
      // navigate to this video
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }
  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

    const subSectionIndex = courseSectionData[currentSectionIndex].SubSection.findIndex((data) => data._id === subSectionId)

    if (subSectionIndex !== 0) {
      // same section, previous video
      const prevSubSectionId = courseSectionData[currentSectionIndex].SubSection[subSectionIndex - 1]._id
      // navigate to this video
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    } else {
      // goto next section
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id
      const noOfSubSection = courseSectionData[currentSectionIndex - 1].SubSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].SubSection[noOfSubSection - 1]._id
      // navigate to this video
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }
  const handleLectureComplete = async () => {
    const { success, error } = await markLectureAsComplete({ courseId, subSectionId }, token)
    if (success) {
      // Update UI state
      dispatch(updateCompletedLectures(subSectionId))
    } else {
      console.error("Failed : ", error)
    }
  }

  if (loading || !videoData) {
    return (
      <div className='flex h-[calc(100vh-3.5rem)] w-full justify-center items-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 text-dark-richblack-500'></div>
      </div>
    )
  }
  const handleVideoEnded = () => {

    // console.log("Video ended triggered");
    setVideoEnded(prev => !prev);
    // console.log("videoEnded: ",videoEnded)
  }

  return (
    <div className='flex flex-col gap-5 p-4 text-light-richblack-5 dark:text-dark-richblack-5'>
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <div
          onContextMenu={(e) => e.preventDefault()}
          style={{
            position: 'relative',
            paddingBottom: '56.25%', // 16:9 Aspect Ratio
            height: 0,
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <ReactPlayer
            ref={playerRef}
            url={videoData?.videoUrl}
            controls={true}
            playsinline={true}
            onReady={handleVideoReady}
            onError={handleVideoError}
            onEnded={handleVideoEnded}
            width="100%"
            height="100%"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                  disablePictureInPicture: true,
                },
              },
            }}
          />
          {videoEnded && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.5))',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 100,
              }}
            >
              {!completedLecture.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onClick={() => handleLectureComplete()}
                  text={loading ? "Processing" : "Mark as Completed"}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}
              <IconBtn
                disabled={loading}
                onClick={() => {
                  if (playerRef.current) {
                    playerRef.current.seekTo(0);
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />
              <div className="flex gap-4 mt-4">
                {!ifFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Previous Lecture
                  </button>
                )}
                {!ifLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next Lecture
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      )}
      <h1 className='text-2xl font-bold'>{videoData?.title}</h1>
      <p>{videoData?.description}</p>
      {completedLecture.length === totalNoOfLectures && (
        <div>

          <p className='text-sm text-light-richblack-400 dark:text-dark-richblack-400 text-center'>
            Congratulations! You have completed this course.
          </p>
          <IconBtn text={"Download Certificate"} customClasses="text-xl max-w-max px-4 mx-auto my-4" onClick={()=>setShowCertificate(true)}/>
            {showCertificate && (
              <Certificate              
                setShowCertificate={setShowCertificate}
              />
            )}
        </div>
      )}
    </div>
  );
}

export default VideoDetails
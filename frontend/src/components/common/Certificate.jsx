import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { useSelector } from 'react-redux';
import logo from '../../assets/Logo.png'
import jsPDF from 'jspdf';

const CertificateModal = ({ setShowCertificate }) => {
    const certificateRef = useRef();
    const [isGenerating, setIsGenerating] = useState(false);
    const [isRefReady, setIsRefReady] = useState(false);
    const { user } = useSelector((state) => state.profile);
    const { courseName, instructor } = useSelector((state) => state.viewCourse.courseEntireData);

    const studentName = user?.firstName + " " + user?.lastName;
    const instructorName = instructor?.firstName + " " + instructor?.lastName;
    const completionDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handleDownloadPNG = async () => {
        setIsGenerating(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // Increased delay
            const certificateElement = certificateRef.current;
            const clone = certificateElement.cloneNode(true);
            // Apply print-specific styles to the clone
            clone.style.width = `${certificateElement.offsetWidth}px`;
            clone.style.height = `${certificateElement.offsetHeight}px`;
            clone.style.position = 'absolute';
            clone.style.left = '-9999px';
            clone.style.top = '0';
            clone.style.visibility = 'visible';
            clone.style.opacity = '1';

            document.body.appendChild(clone);

            const canvas = await html2canvas(clone, {
                scale: 4, // Increased scale for higher quality
                logging: true,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                windowWidth: certificateElement.scrollWidth,
                windowHeight: certificateElement.scrollHeight,
                letterRendering: true,
                // Add these options for better text rendering
                onclone: (clonedDoc) => {
                    clonedDoc.querySelectorAll('*').forEach(el => {
                        el.style.boxSizing = 'border-box';
                        if (el.style.border) {
                            el.style.border = el.style.border.replace(/px/g, '') + 'px';
                        }
                    });
                }
            });

            document.body.removeChild(clone);

            const imgData = canvas.toDataURL('image/png', 1.0);
            const link = document.createElement('a');
            link.download = `${studentName}-${courseName}-certificate.png`;
            link.href = imgData;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error generating certificate:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownloadPDF = async () => {
        setIsGenerating(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay for DOM updates

            const certificateElement = certificateRef.current;
            const clone = certificateElement.cloneNode(true);

            // Apply print-specific styles to the clone
            clone.style.width = `${certificateElement.offsetWidth}px`;
            clone.style.height = `${certificateElement.offsetHeight}px`;
            clone.style.position = 'absolute';
            clone.style.left = '-9999px';
            clone.style.top = '0';
            clone.style.visibility = 'visible';
            clone.style.opacity = '1';

            document.body.appendChild(clone);

            const canvas = await html2canvas(clone, {
                scale: 2, // Slightly lower scale for PDF (since PDF is vector-based)
                logging: true,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                windowWidth: certificateElement.scrollWidth,
                windowHeight: certificateElement.scrollHeight,
                letterRendering: true,
                onclone: (clonedDoc) => {
                    clonedDoc.querySelectorAll('*').forEach(el => {
                        el.style.boxSizing = 'border-box';
                        if (el.style.border) {
                            el.style.border = el.style.border.replace(/px/g, '') + 'px';
                        }
                    });
                }
            });

            document.body.removeChild(clone);

            // Create PDF
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: [canvas.width * 0.264583, canvas.height * 0.264583] // Convert pixels to mm
            });

            pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
            pdf.save(`${studentName}-${courseName}-certificate.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleClose = () => {
        if (isGenerating) {
            console.warn('Cannot close modal while generating PNG');
            return;
        }
        setShowCertificate(false);
    };

    useEffect(() => {
        // Set isRefReady to true after component mounts
        setIsRefReady(true);
    }, []);

    return (
        <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white/10 backdrop-blur-sm'>
            <div className='w-11/12 max-w-4xl rounded-lg border dark:border-dark-richblack-400 border-light-richblack-400 dark:bg-dark-richblack-800 bg-light-richblack-800 p-6 relative'>
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-light-richblack-25 dark:text-dark-richblack-25 cursor-pointer hover:dark:text-dark-richblack-100 hover:text-light-richblack-100 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <div
                            ref={certificateRef}
                            className="bg-white border-1 border-light-richblack-5 dark:border-dark-richblack-5 p-8 rounded-lg shadow-xl text-center"
                            style={{
                                backgroundImage: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
                                minHeight: '500px',
                                position: 'relative',
                                overflow: 'hidden',
                                width: '100%',
                                WebkitFontSmoothing: 'antialiased',
                                MozOsxFontSmoothing: 'grayscale',
                                textRendering: 'optimizeLegibility',
                                WebkitPrintColorAdjust: 'exact',
                                colorAdjust: 'exact',
                                border: '2px solid #2563eb', // Explicit border definition
                                borderStyle: 'solid', // Explicit style
                                borderWidth: '2px', // Explicit width
                                borderColor: '#2563eb' // Explicit color
                            }}
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-[#2563eb]"></div>
                            <div className="absolute bottom-0 right-0 opacity-10">
                                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200Z" fill="#3B82F6" />
                                </svg>
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-center items-center">
                                <div className="mb-2">
                                    <img src={logo} alt="Study2Success" className="h-16 mx-auto" />
                                </div>
                                <h2 className="text-3xl font-bold text-blue-800 mb-2" style={{ fontSize: '32px' }}>Certificate of Completion</h2>
                                <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 border-b-2 border-blue-200 pb-4 px-12" style={{ fontSize: '48px' }}>
                                    {studentName}
                                </h1>
                                <p className="text-gray-700 mb-6">has successfully completed the course</p>
                                <h3 className="text-2xl font-semibold text-blue-700 mb-8">{courseName}</h3>
                                <div className="flex justify-between w-full max-w-md mt-8">
                                    <div className="text-center">
                                        <div className="h-16 border-t-2 border-blue-300 pt-2">
                                            <p className="font-semibold">{completionDate}</p>
                                            <p className="text-sm text-gray-500">Date</p>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="h-16 border-t-2 border-blue-300 pt-2">
                                            <p className="font-semibold">{instructorName}</p>
                                            <p className="text-sm text-gray-500">Instructor</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12 flex gap-4">
                                    <div className="w-24 h-8 border-t-2 border-gray-400"></div>
                                    <div className="text-gray-500 text-sm">Study2Success</div>
                                    <div className="w-24 h-8 border-t-2 border-gray-400"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-64 space-y-4 no-print">
                        <h3 className="text-xl font-semibold">Download Certificate</h3>
                        <button
                            onClick={handleDownloadPNG}
                            disabled={isGenerating}
                            className="w-full bg-[#2563eb] cursor-pointer hover:bg-[#1447e6] text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                            {isGenerating ? 'Generating...' : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download PNG
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            disabled={isGenerating}
                            className={`w-full bg-white text-blue-600 border border-blue-600 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${!isGenerating ? 'cursor-pointer hover:bg-gray-100' : 'cursor-not-allowed opacity-50'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Save as PDF
                        </button>
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-blue-800 mb-2">Share your achievement</h4>
                            <div className="flex gap-3">
                                <button className="p-2 bg-white rounded-full shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer">
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </button>
                                <button className="p-2 bg-white rounded-full shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer">
                                    <svg className="w-5 h-5 text-blue-800" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-3.584-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </button>
                                <button className="p-2 bg-white rounded-full shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer">
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateModal;
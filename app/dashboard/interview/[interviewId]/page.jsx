"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { Button } from "@/components/ui/button";
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import Link from 'next/link';

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    useEffect(() => {
        console.log('Params:', params);
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId));

        console.log(result[0]);
        setInterviewData(result[0]);
    };

    return (
        <div className='my-10'>
            <h2 className='font-bold text-2xl'>Let's Get Started!</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {interviewData && (
                    <div className='flex flex-col my-7 gap-5'>
                        <div className='flex flex-col p-5 rounded-lg border'>
                            <h2 className='text-lg'>
                                <strong>Job Position/Job Role: </strong>{interviewData.jobPosition}
                            </h2>
                            <h2 className='text-lg'>
                                <strong>Job Description: </strong>{interviewData.jobDescription}
                            </h2>
                            <h2 className='text-lg'>
                                <strong>Years of Experience : </strong>{interviewData.jobExperience}
                            </h2>
                        </div>
                        <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                            <h2 className='flex gap-2 items-center text-yellow-400'><Lightbulb /><strong>Information</strong></h2>
                            <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_VIDEO_INFORMATION}</h2>
                        </div>
                    </div>
                )}
                <div className='flex items-center justify-center flex-col'>
                    {webCamEnabled ? (
                        <div className='flex flex-col mt-4 justify-center items-center bg-secondary rounded-lg p-5'>
                            <Webcam
                                onUserMedia={() => setWebCamEnabled(true)}
                                onUserMediaError={() => setWebCamEnabled(false)}
                                mirrored={true}
                                style={{
                                    height:300,
                                    width:'100%',
                                    zIndex:10
                                }}
                            />
                        </div>
                    ) : (
                        <>
                            <WebcamIcon className='h-80 w-full my-7 p-20 bg-secondary rounded-lg' />
                            <Button className='w-full mt-10' onClick={() => setWebCamEnabled(true)}>
                                Enable Web Cam and Microphone
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className='mt-10 flex justify-end items-end'>
                <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                    <Button>Start Interview</Button>
                </Link>
            </div>
        </div>
    );
}

export default Interview;

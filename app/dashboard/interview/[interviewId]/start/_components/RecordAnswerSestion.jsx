"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { chatSession } from '@/utils/GeminiAIModel';
import { UserAnswerTable } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { Mic, StopCircle } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam';
import { toast } from 'sonner';

function RecordAnswerSestion({mockInterviewQuestion, activeQuestionIndex, interviewData }) {
    const [userAnswer, setUserAnswer] = useState('');
    const {user} = useUser();
    const [loading, setLoading] = useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(()=>{
        {results.map((result) => (
            setUserAnswer(prevsAns=>prevsAns+result?.transcript)
        ))}
    },[results]);

    useEffect(()=>{
        if(!isRecording && userAnswer?.length>10){
            UpdateUserAnswer();
        }
    },[userAnswer])

    const StartStopRecording= async()=>{
        if(isRecording){
            stopSpeechToText();
        }else{
            startSpeechToText();
        }
    }

    const UpdateUserAnswer= async()=>{
        setLoading(true);
        const feedbackPrompt = "Question:"+ mockInterviewQuestion[activeQuestionIndex]?.question + ", User Answer: "+ userAnswer +" Dependes on Question and Use Answer for Given Interview Question Please Give us Rating for Answer and Feedback as Area of Improvment if Any in Just 3 to 5 Lines to improve it in JSON Format with rating field and feedback field. Don't Give any other things Only rating and feedback. and Give Rating only one Number";

        const result = await chatSession.sendMessage(feedbackPrompt);
        console.log(result);
        const mockJsonResp = (result.response.text()).replace('```json','').replace('```',"");
        console.log(mockJsonResp);

        const JsonFeedbackResp = JSON.parse(mockJsonResp);
        
        const resp= await db.insert(UserAnswerTable)
        .values({
            mockIdRef: interviewData?.mockId,
            question: mockInterviewQuestion[activeQuestionIndex]?.question,
            correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.answer,
            userAns: userAnswer,
            feedback: JsonFeedbackResp?.feedback,
            rating: JsonFeedbackResp?.rating,
            useEmail: user.primaryEmailAddress.emailAddress,
            createdAt: moment().format('DD-MM-YYYY')
        });

        if(resp){
            toast('Answer Recorded Successfully!')
            setUserAnswer('');
            setResults([]);
        }
        setResults([]);
        setLoading(false);
    }

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
                <img src='/webcam.png' alt='webcam image' className='absolute' width={200} height={200}/>
                <Webcam 
                mirrored={true}
                    style={{
                        height:300,
                        width:'100%',
                        zIndex:10
                    }}
                />
            </div>
            <Button 
            disabled = {loading}
            variant="outline" className="my-10" onClick={StartStopRecording}>
                {isRecording?
                    <h2 className='text-red-600 animate-pulse flex gap-2 items-center font-bold'>
                        <StopCircle /> Stop Recording 
                    </h2>
                :   
                    <h2 className='text-primary font-bold flex gap-2'>
                        <Mic/> Record Answer
                    </h2>
                }
            </Button>
        </div>
    )
}

export default RecordAnswerSestion;
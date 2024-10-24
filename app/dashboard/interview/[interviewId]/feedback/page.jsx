"use client"
import { db } from '@/utils/db';
import { UserAnswerTable } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Feedback({params}) {
    const [feedbackList, setFeedbackList] = useState();
    const router = useRouter();

    useEffect(()=>{
        GetFeedback();
    },[]);

    const GetFeedback= async()=>{
        const result= await db.select()
        .from(UserAnswerTable)
        .where(eq(UserAnswerTable.mockIdRef, params.interviewId))
        .orderBy(UserAnswerTable.id);

        setFeedbackList(result);

        console.log("Result: ",result);
    }

    // Calculate the overall rating
    const calculateOverallRating = () => {
        if (feedbackList.length === 0) return 0;
        const totalRating = feedbackList.reduce((acc, item) => {
            const ratingAsInt = parseInt(item.rating); // Convert rating from varchar to int
            return acc + (isNaN(ratingAsInt) ? 0 : ratingAsInt); // If rating is not a number, count as 0
        }, 0);
        return Math.round(totalRating / feedbackList.length);
    };

    return (
        <div className='p-10'>
            {feedbackList?.length === 0
                ?
                    <h2 className='text-3xl text-red-500 justify-center font-bold'>No Interview Feedback Record Found !</h2>
                :
                <>
                    <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
                    <h2 className='font-bold text-2xl'>Here is your Interview Feedback!</h2>
                    {feedbackList?.length > 0 && (
                        <h2 className='text-primary text-lg my-3'>
                            Your overall rating: <strong>{calculateOverallRating()}</strong>/10
                        </h2>
                    )}
                    <h2 className='text-sm text-gray-500'>Find Below interview Question with Correct Answers, your answers and Feedback for Improvement</h2>
                    {feedbackList && feedbackList.map((item, index) => (
                        <Collapsible key={index} className='mt-7'>
                            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex gap-3 w-full'>
                                <ChevronsUpDownIcon className='h-5 w-5'/>{item?.question}
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating: </strong>{item.rating}</h2>
                                    <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
                                    <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Expected Answer: </strong>{item.correctAnswer}</h2>
                                    <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900'><strong>Feedback: </strong>{item.feedback}</h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </>
            }
            <Button className='mt-10 font-bold' onClick={()=>router.replace('/dashboard')}>Go Home</Button>
        </div>
    )
}

export default Feedback;
"use client"
import React, {useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
    } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from '@/utils/GeminiAIModel';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobEx, setJobEx] = useState();
    const [loading, setLoading] = useState();
    const [josnResp, setJsonResp] = useState([]);
    const router = useRouter();

    const {user} = useUser();

    const onSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        
        const InputPrompt = "You are an Interviewer at Software Company Ask the Question according to Job Position: "+ jobPosition + ", Job Description: "+ jobDesc + "Years of Experience: " + jobEx + " Depends on Job Position, Job Description and Years of Experience Give us Only "+ process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +" Interview Questions along with Answers in JOSN Format, Give us question and answer field on JSON. Don't Give any other things Only question and answers. Ask the Question Based on Years of Experience and Skills Candidate have."

        console.log(InputPrompt);
        const result = await chatSession.sendMessage(InputPrompt);

        const mockJsonResponse = (result.response.text()).replace('```json','').replace('```',"");

        console.log(JSON.parse(mockJsonResponse));
        setJsonResp(mockJsonResponse);

        if(mockJsonResponse){
            const resp = await db.insert(MockInterview)
            .values({
                mockId: uuidv4(),
                jsonMockResponse: mockJsonResponse,
                jobPosition: jobPosition,
                jobDescription: jobDesc,
                jobExperience: jobEx,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY')
            }).returning({mockId:MockInterview.mockId});

            if(resp){
                setOpenDialog(false);
                router.push('/dashboard/interview/' + resp[0].mockId);
            }
        }else{
            console.error("No JSON response received from AI");
        }

        setLoading(false);
    };
    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={()=>{setOpenDialog(true)}}>
                <h2 className= 'text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about your Job Interviewing</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Add details about your Job Position/Role, Job Description and years of Experience
                    </DialogDescription>
                        <form onSubmit={onSubmit}>
                            <div className='mt-7 my-3'>
                                <label className='mt-2'>
                                    <p className='text-black font-bold'>Job Role/Job Position </p>
                                    <Input className='mt-2 bg-secondary cursor-text' placeholder='Ex. Full Stack Developer' required onChange={(event)=>setJobPosition(event.target.value)} />
                                </label>
                            </div>
                            <div className='mt-3 my-3'>
                                <label className='mt-2'>
                                        <p className='text-black font-bold'>Job Description/Tech Stack (In Short)</p>
                                        <Textarea className='mt-2 bg-secondary cursor-text' placeholder='Eg. React, Angular, Node.js, SQL, AWS etc.' required onChange={(event)=>setJobDesc(event.target.value)} />
                                </label>
                            </div>
                            <div className='mt-3 my-3'>
                                <label className='mt-2'>
                                        <p className='text-black font-bold'>Years of Experience</p>
                                        <Input className='mt-2 bg-secondary cursor-text' placeholder='Ex. 2' type='number' max="50" required onChange={(event)=>setJobEx(event.target.value)} />
                                </label>
                            </div>
                            <div className='flex gap-5 justify-end'>
                                <Button type="button" variant="ghost" onClick={()=>{setOpenDialog(false)}}>Cancel</Button>
                                <Button type="submit" disabled={loading}>
                                    {loading?
                                        <>
                                        <LoaderCircle className='animate-spin'/>'Generating From AI'
                                        </>:'Start Interview'
                                    }
                                </Button>
                            </div>
                        </form>
                </DialogContent>
            </Dialog>
        </div>
    )
};

export default AddNewInterview;
"use client"
import React, {useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose
    } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={()=>{setOpenDialog(true)}}>
                <h2 className= 'text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                    <DialogTitle className='text-2xl'>Tell us more about your Job Interviewing</DialogTitle>
                    <DialogDescription>
                        <h2>Add details about your Job Position/Role, Job Description and years of Experience</h2>
                        <div className='mt-7 my-3'>
                            <label className='mt-2'>
                                <p className='text-black font-bold'>Job Role/Job Position </p>
                                <Input className='mt-2 bg-secondary cursor-text' placeholder='Ex. Full Stack Developer' />
                            </label>
                        </div>
                        <div className='mt-7 my-3'>
                        <label className='mt-2'>
                                <p className='text-black font-bold'>Job Description/Tech Stack (In Short)</p>
                                <Textarea className='mt-2 bg-secondary cursor-text' placeholder='Eg. React, Angular, Node.js, SQL, AWS etc.' />
                            </label>
                        </div>
                        <div className='mt-7 my-3'>
                        <label className='mt-2'>
                                <p className='text-black font-bold'>Years of Experience</p>
                                <Input className='mt-2 bg-secondary cursor-text' placeholder='Ex. 2' type='number' />
                            </label>
                        </div>
                        <div className='flex gap-5 justify-end'>
                            <Button variant="ghost" onClick={()=>{setOpenDialog(false)}}>Cancel</Button>
                            <Button onClick={()=>{setOpenDialog(false)}}>Start Interview</Button>
                        </div>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
                <DialogClose />
            </Dialog>
        </div>
    )
};

export default AddNewInterview;
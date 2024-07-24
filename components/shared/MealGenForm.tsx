"use client";
import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '../ui/button';


const MealGenForm = () => {
  return (
    <div className="grid w-full gap-2">
      <Textarea />
      <Button className='mt-1 bg-purple-gradient text-white p-2 rounded-md'>Generate Meals</Button>
    </div>

  )
}

export default MealGenForm





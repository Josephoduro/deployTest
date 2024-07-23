"use client";
import React from 'react'
import { z } from "zod"
 
const formSchema = z.object({
  username: z.string().min(2).max(50),
})

const MealGenForm = () => {
  return (
    <div>MealGenForm</div>
  )
}

export default MealGenForm





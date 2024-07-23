
"use client";

import { useRouter } from 'next/navigation'; 
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  ingredient: z.string(),
});

const TransformationForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredient: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Redirect to the results page with the ingredient as a query parameter
    router.push(`/results?ingredients=${encodeURIComponent(values.ingredient)}`);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <Input
          id="ingredient"
          placeholder="Search for meals by ingredient"
          {...form.register('ingredient')}
          className="mt-1 block w-full"
        />
      </div>
      <Button type="submit" className="bg-purple-gradient text-white p-2 mt-4">
        Generate Meals
      </Button>
    </form>
  );
};

export default TransformationForm;

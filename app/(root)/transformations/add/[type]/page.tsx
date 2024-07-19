import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import SectionCard from '@/components/SectionCard';

const AddTransformationTypePage = async ({ params: { type } }: 
  SearchParamProps) => {
  const transformation = transformationTypes[type];

  return (
    <>
      <Header
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
      
      <Dialog>
        <DialogTrigger className='bg-purple-gradient text-white hover:bg-purple-400 font-bold py-2 px-4 rounded mt-5'>Get started</DialogTrigger>
        <DialogContent>
           <DialogHeader>
           <DialogTitle className="text-2xl font-bold mb-6">I am looking for...</DialogTitle>
           <DialogDescription>
             <SectionCard title="Keto" description="Delicious low-carb recipes to keep you in ketosis." icon="🥑" />
             <SectionCard title="Vegan" description="Plant-based meals for a healthier lifestyle." icon="🌱" />
        
           </DialogDescription>
        </DialogHeader>
       </DialogContent>
      </Dialog>

    </>
  )
}

export default AddTransformationTypePage
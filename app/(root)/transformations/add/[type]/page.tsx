// pages/[type]/index.tsx
import Header from '@/components/shared/Header';
import { transformationTypes } from '@/constants';
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SectionCard from '@/components/SectionCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface SearchParamProps {
  params: {
    type: string;
  };
}

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const transformation = transformationTypes[type];

  return (
    <>
      <Header
        title={transformation.title}
        subtitle={transformation.subTitle}
      />

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Dialog>
        <DialogTrigger className="bg-purple-gradient text-white hover:bg-purple-400 font-bold py-2 px-4 rounded mt-5">
          Get started
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-6">I am looking for...</DialogTitle>
            <DialogDescription>
              <SectionCard title="Keto" description="Delicious low-carb recipes to keep you in ketosis." icon="🥑" />
              <SectionCard title="Vegan" description="Plant-based meals for a healthier lifestyle." icon="🌱" />
              <SectionCard title="Gluten Free" description="Plant-based meals for a healthier lifestyle." icon="🍞" />
              <SectionCard title="None" description="Plant-based meals for a healthier lifestyle." icon="🥞" />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTransformationTypePage;


import Header from '@/components/shared/Header';
import { transformationTypes } from '@/constants';
import TransformationForm from '@/components/shared/TransformationForm';
import MenuCard from '@/components/shared/MenuCard';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



interface SearchParamProps {
  params: {
    type: string;
  };
}

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {

  return (
    <>
      <Header
        title='Menu Generator'
        subtitle='Generates unique menu based on dietary preferences'
      />
   {/* <Carousel className="flex items-center mt-4 mb-4">
        <CarouselContent className="flex items-center">
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <AlertDialog>
         <AlertDialogTrigger>
         <MenuCard
          title="Lentil Bolognese"
          tags={['vegan', 'plant-based', 'diet']}
          />
         </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>A hearty and savory sauce made from lentils, tomatoes, onions, garlic, and Italian herbs, served over pasta.</AlertDialogTitle>
                  <AlertDialogDescription>
                      To prepare a hearty and savory lentil Bolognese sauce, 
                      start by cooking 1 cup of dried lentils in 4 cups of vegetable broth until tender, 
                      then set aside. In a large skillet, heat 2 tablespoons of olive oil and sauté a finely chopped onion, 
                      2 carrots, and 2 celery stalks until soft. Add 4 minced garlic cloves and cook for 2 minutes, 
                      then stir in 2 tablespoons of tomato paste. Combine with a can of crushed tomatoes, the cooked lentils, 
                      and season with 1 teaspoon each of dried oregano, basil, and 1/2 teaspoon of thyme, plus salt and pepper to taste. 
                      Let the mixture simmer for 20-30 minutes, adding broth if it thickens too much. 
                      Stir in 1 tablespoon of balsamic vinegar before serving over your favorite cooked pasta, garnished with fresh basil or parsley.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                 <AlertDialogFooter>
           <AlertDialogCancel>Close</AlertDialogCancel>
         </AlertDialogFooter>
           </AlertDialogContent>
     </AlertDialog>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <AlertDialog>
         <AlertDialogTrigger>
         <MenuCard
          title="Keto Beef Stir-Fry"
          tags={['keto', 'fat-based', 'diet']}
          />
         </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Thinly sliced beef stir-fried with broccoli, bell peppers, and mushrooms in a savory soy-ginger sauce, served with cauliflower rice.</AlertDialogTitle>
                  <AlertDialogDescription>
                     To prepare a Keto Beef Stir-Fry, 
                     start by thinly slicing 1 pound of beef sirloin or flank steak and setting it aside. 
                     For the cauliflower rice, grate a large head of cauliflower and sauté it in 1 tablespoon of oil until tender, 
                     then set aside. In a large skillet, heat 2 tablespoons of oil and stir-fry 3 minced garlic cloves and 1 tablespoon of minced ginger until fragrant. 
                     Add 1 head of broccoli florets, 2 sliced bell peppers, and 8 ounces of sliced mushrooms, cooking until tender-crisp. Push the vegetables aside, add the beef, and stir-fry until browned. Combine the beef and vegetables, then pour over a sauce made from 1/4 cup soy sauce, 2 tablespoons rice vinegar, and 1 tablespoon sesame oil. Cook for a few more minutes until the sauce thickens, then serve over the cauliflower rice, garnished with sesame seeds and green onions if desired.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                 <AlertDialogFooter>
           <AlertDialogCancel>Close</AlertDialogCancel>
         </AlertDialogFooter>
           </AlertDialogContent>
     </AlertDialog>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <AlertDialog>
         <AlertDialogTrigger>
         <MenuCard
          title="Beef and Broccoli Stir-Fry"
          tags={['broccoli', 'egg-based', 'diet']}
          />
         </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Thinly sliced beef stir-fried with broccoli, garlic, ginger, and coconut aminos (a soy sauce alternative) for a savory, Paleo-friendly dish.</AlertDialogTitle>
                  <AlertDialogDescription>
                  To prepare Beef and Broccoli Stir-Fry, start by thinly slicing 1 pound of beef sirloin or flank steak and setting it aside. 
                  Heat 2 tablespoons of coconut oil in a large skillet over medium-high heat, then add the beef and cook until browned, about 3-4 minutes. 
                  Remove the beef from the skillet and set it aside. In the same skillet, add 3 minced garlic cloves and 1 tablespoon of minced ginger, cooking until fragrant, about 1 minute. Add 1 head of broccoli florets and stir-fry for about 5 minutes until they are tender-crisp. Return the beef to the skillet and pour in 1/4 cup of coconut aminos, stirring to coat everything evenly. Cook for an additional 2-3 minutes until the sauce thickens slightly and everything is well combined. 
                  Serve the beef and broccoli stir-fry hot, garnished with sesame seeds if desired.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                 <AlertDialogFooter>
           <AlertDialogCancel>Close</AlertDialogCancel>
         </AlertDialogFooter>
           </AlertDialogContent>
     </AlertDialog>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <AlertDialog>
         <AlertDialogTrigger>
         <MenuCard
          title="Quinoa and Stuffed Peppers"
          tags={['quinoa', 'gluten-free', 'diet']}
          />
         </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Bell peppers filled with a mixture of quinoa, black beans, corn, diced tomatoes, and spices, baked until tender.</AlertDialogTitle>
                  <AlertDialogDescription>
                    To prepare Quinoa and Black Bean Stuffed Peppers, start by preheating your oven to 375°F (190°C). Cook 1 cup of quinoa according to package instructions and set aside. Cut the tops off 4 bell peppers and remove the seeds and membranes. In a bowl, combine the cooked quinoa with 1 can of drained and rinsed black beans, 1 cup of corn, 1 cup of diced tomatoes, and 1 teaspoon each of cumin, paprika, and garlic powder. Season with salt and pepper to taste. Stuff the mixture into the bell peppers, packing it tightly. Place the stuffed peppers upright in a baking dish, cover with foil, and bake for 30-35 minutes, or until the peppers are tender. Remove the foil and bake for an additional 5 minutes to slightly crisp the tops. Serve hot, garnished with fresh cilantro or a sprinkle of cheese if desired.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                 <AlertDialogFooter>
           <AlertDialogCancel>Close</AlertDialogCancel>
         </AlertDialogFooter>
           </AlertDialogContent>
     </AlertDialog>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <AlertDialog>
         <AlertDialogTrigger>
         <MenuCard
          title="Citrus Herb Grilled Chicken"
          tags={['grilled-chicken', 'whole-30']}
          />
         </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Chicken breasts marinated in a mixture of olive oil, lemon juice, garlic, and fresh herbs, then grilled and served with a side of steamed green beans and a mixed green salad.</AlertDialogTitle>
                  <AlertDialogDescription>
                   To prepare Citrus Herb Grilled Chicken, start by creating a marinade with 1/4 cup of olive oil, the juice of 2 lemons, 3 minced garlic cloves, and a mix of fresh herbs like rosemary, thyme, and parsley. Season with salt and pepper, then place 4 chicken breasts in a resealable bag or shallow dish and pour the marinade over them, ensuring they are well coated. Marinate in the refrigerator for at least 30 minutes or up to 4 hours. Preheat your grill to medium-high heat and grill the chicken for 6-7 minutes per side, or until fully cooked and the internal temperature reaches 165°F (74°C). While the chicken is grilling, steam a side of green beans until tender and toss together a mixed green salad with your choice of vegetables and a light vinaigrette. Serve the grilled chicken alongside the green beans and salad for a fresh, flavorful meal.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                 <AlertDialogFooter>
           <AlertDialogCancel>Close</AlertDialogCancel>
         </AlertDialogFooter>
           </AlertDialogContent>
     </AlertDialog>
          </CarouselItem>
        </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>*/}

    <Card className='mt-5'>
        <CardHeader>
          <CardTitle>Don’t know what to eat yet?</CardTitle>
             <CardDescription className='mt-2'>Get a personalized dining experience where a menu is specifically tailored to meet your individual preferences, <br></br> dietary needs, or special requests.</CardDescription>
        </CardHeader>
        <CardContent>
        <Dialog>
        <DialogTrigger className='mt-1 bg-purple-gradient text-white p-2 rounded-md'>
          
            Get Started
        
        </DialogTrigger>
        <DialogContent>
    <DialogHeader>
      <DialogTitle>Complete Form to Generate Menu</DialogTitle>
      <DialogDescription>
        <TransformationForm/>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
        </Dialog>
        </CardContent>
        
    </Card>


      
    </>
  );
};

export default AddTransformationTypePage;

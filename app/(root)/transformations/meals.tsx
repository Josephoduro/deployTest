// pages/meals.tsx
import { useRouter, useSearchParams } from 'next/navigation';
import MealSearch from '@/components/MealSearch';

const MealsPage: React.FC = () => {
  const SearchParams = useSearchParams ();
  const title = SearchParams.get('title') || '';

  return <MealSearch initialSearchInput={title} />;
};

export default MealsPage;

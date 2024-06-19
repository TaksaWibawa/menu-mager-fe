import {
  createUserSubscription,
  getRecipes,
  selectRecipes,
  selectUserSubscription,
  setSubscriptionDelivery,
} from '@/slices';
import { HiTrash } from 'react-icons/hi';
import { LayoutUser } from '@/layouts';
import { Spinner } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks';

const ButtonGroup = ({ options, selectedOption, setSelectedOption, selectedMeals }) => (
  <div className="flex justify-between w-full">
    {options.map((option) => (
      <div
        className="indicator"
        key={option}
      >
        <span className="indicator-item badge badge-error text-white">{selectedMeals[option]?.length || 0}</span>
        <button
          className={`btn btn-success flex-grow ${
            selectedOption === option ? 'text-white' : 'btn-outline'
          } rounded-none ${
            option === options[0] ? 'rounded-l-md' : option === options[options.length - 1] ? 'rounded-r-md' : ''
          }`}
          onClick={() => setSelectedOption(option)}
        >
          {option}
        </button>
      </div>
    ))}
  </div>
);

export function SelectMealsPage() {
  const showToast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subscription = useSelector(selectUserSubscription);
  const { data, status } = useSelector(selectRecipes);
  const [selectedOption, setSelectedOption] = useState('Week 1');
  const [selectedMeals, setSelectedMeals] = useState({});

  const handleSelectMeal = (meal) => {
    const currentWeekMeals = selectedMeals[selectedOption] || [];
    if (
      currentWeekMeals.length < subscription.subscriptionDetail?.mealsPerWeek &&
      !currentWeekMeals.find((m) => m.id === meal.id)
    ) {
      setSelectedMeals({
        ...selectedMeals,
        [selectedOption]: [...currentWeekMeals, meal],
      });
    }
  };

  const handleDeleteMeal = (meal) => {
    setSelectedMeals({
      ...selectedMeals,
      [selectedOption]: selectedMeals[selectedOption].filter((m) => m.id !== meal.id),
    });
  };

  const handleConfirmOrder = async () => {
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const subscriptionDelivery = weeks.map((week, index) => {
      const meals = selectedMeals[week] || [];
      const totalRecipe = meals.length;
      const recipe = meals.reduce((acc, meal) => {
        const existingMeal = acc.find((m) => m.name === meal.name);
        if (existingMeal) {
          existingMeal.amount += 1;
        } else {
          acc.push({ name: meal.name, amount: 1 });
        }
        return acc;
      }, []);

      const date = new Date();
      date.setDate(date.getDate() + index * 7);

      return {
        date: date.toISOString(),
        totalRecipe: totalRecipe.toString(),
        recipe,
      };
    });

    dispatch(setSubscriptionDelivery(subscriptionDelivery));

    const newSubscription = {
      ...subscription,
      subscriptionDelivery,
    };

    dispatch(createUserSubscription(newSubscription)).then((result) => {
      if (createUserSubscription.fulfilled.match(result)) {
        showToast('Subscription created successfully', 'success');
        navigate('/');
      } else {
        showToast(result.payload?.message || 'Failed to create subscription', 'error');
      }
    });
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [subscription.subscriptionDetail]);

  useEffect(() => {
    if (
      !subscription.subscriptionDetail ||
      !subscription.subscriptionDetail.numOfPeople ||
      !subscription.subscriptionDetail.mealsPerWeek
    ) {
      navigate('/order/select-plan');
    }
  }, [navigate]);

  if (status === 'loading' || !data) {
    return (
      <LayoutUser>
        <div className="flex items-center justify-center h-full">
          <Spinner />
        </div>
      </LayoutUser>
    );
  }

  return (
    <LayoutUser>
      <div className="flex flex-col items-center justify-start h-full py-28">
        <div className="mb-8">
          <ButtonGroup
            options={['Week 1', 'Week 2', 'Week 3', 'Week 4']}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            selectedMeals={selectedMeals}
          />
        </div>
        <h1 className="text-2xl font-bold">Select Meals Per Week</h1>
        <p className="text-sm text-gray-500 mt-2">
          Please choose your meals per week maximum <b>{subscription.subscriptionDetail?.mealsPerWeek || 0}</b> meals
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
          {data?.map((recipe) => (
            <div
              key={recipe.id}
              className="border border-gray-200 rounded-md shadow-sm relative"
            >
              <img
                src={process.env.BASE_URL + recipe.photo}
                alt={recipe.name}
                className="w-full h-48 object-cover"
              />
              {(selectedMeals[selectedOption] || []).find((m) => m.id === recipe.id) && (
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2 m-2 hover:bg-red-600"
                  onClick={() => handleDeleteMeal(recipe)}
                >
                  <HiTrash
                    color="white"
                    size={20}
                  />
                </button>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold capitalize">{recipe.name}</h2>
                <p className="text-sm text-gray-500 capitalize">{recipe.description}</p>
                <button
                  className="btn btn-success w-full mt-4 text-white"
                  disabled={
                    (selectedMeals[selectedOption] || []).length >= subscription.subscriptionDetail?.mealsPerWeek ||
                    (selectedMeals[selectedOption] || []).find((m) => m.id === recipe.id)
                  }
                  onClick={() => handleSelectMeal(recipe)}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
          <button
            className="btn btn-success mt-12 text-white col-span-3 mx-auto w-1/2"
            disabled={Object.keys(selectedMeals).length < 4}
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </LayoutUser>
  );
}

import {
  getSubscriptionPlan,
  resetSubscriptionPlanState,
  resetUserSubscription,
  selectSubscriptionPlan,
  setSubscriptionDetail,
} from '@/slices';
import { LayoutUser } from '@/layouts';
import { FilledButton, Spinner } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonGroup = ({ options, selectedOption, setSelectedOption }) => (
  <div className="flex justify-between w-full">
    {options.map((option) => (
      <button
        key={option}
        className={`btn btn-success flex-grow ${
          selectedOption === option ? 'text-white' : 'btn-outline'
        } rounded-none ${
          option === options[0] ? 'rounded-l-md' : option === options[options.length - 1] ? 'rounded-r-md' : ''
        }`}
        onClick={() => setSelectedOption(option)}
      >
        {option}
      </button>
    ))}
  </div>
);

const GridItem = ({ item, selectedItems, setSelectedItems }) => {
  const handleDivClick = (preference) => {
    setSelectedItems(preference);
  };

  const isSelected = !!selectedItems && selectedItems.id === item.preferences.id;

  return (
    <div
      key={item.preferences.id}
      className={`flex flex-col items-center justify-start gap-2 p-2 border border-gray-200 rounded-md h-auto w-48 cursor-pointer ${
        isSelected ? 'bg-green-100' : ''
      }`}
      onClick={() => handleDivClick(item.preferences)}
    >
      <div className="w-full h-20 rounded-full relative">
        <div className="w-20 h-20 rounded-full mx-auto">
          <img
            src={`${process.env.BASE_URL}/${item.preferences.photo}`}
            alt={item.preferences.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <input
          name="preferences"
          type="radio"
          value={item.preferences.id}
          checked={isSelected}
          onChange={() => handleDivClick(item.preferences)}
          className={`absolute top-0 left-0 radio radio-success cursor-pointer w-4 h-4 ${isSelected ? '' : 'hidden'}`}
        />
      </div>
      <label
        className="w-full text-center cursor-pointer"
        htmlFor="preferences"
      >
        <span className="text-center w-full capitalize text-elipsis">{item.preferences.name}</span>
      </label>
    </div>
  );
};

export function ChoosePlanPage() {
  const { data, status } = useSelector(selectSubscriptionPlan);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedPreference, setSelectedPreference] = useState({});
  const [selectedNumOfPeople, setSelectedNumOfPeople] = useState(2);
  const [selectedMealsPerWeek, setSelectedMealsPerWeek] = useState(2);

  const onSubmit = () => {
    dispatch(
      setSubscriptionDetail({
        numOfPeople: selectedNumOfPeople,
        mealsPerWeek: selectedMealsPerWeek,
        totalServing: selectedNumOfPeople * selectedMealsPerWeek,
        boxPrice: data.price_per_serving,
        pricePerServing: data.price_per_serving,
        shippingPrice: 0,
        totalPrice: data.price_per_serving * selectedNumOfPeople * selectedMealsPerWeek,
        preferences: [
          {
            name: selectedPreference.name,
          },
        ],
      })
    );
    navigate('/order/fill-address');
  };

  useEffect(() => {
    dispatch(getSubscriptionPlan());
    dispatch(resetUserSubscription());

    return () => {
      dispatch(resetSubscriptionPlanState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (status === 'success' && data && data.subscription_plan_preferences.length > 0) {
      setSelectedPreference(data.subscription_plan_preferences[0].preferences);
    }
  }, [status, data]);

  if (status === 'loading' || !data)
    return (
      <LayoutUser>
        <div className="flex items-center justify-center h-full py-28">
          <Spinner />
        </div>
      </LayoutUser>
    );

  return (
    <LayoutUser>
      <div className="flex flex-col items-center justify-center h-full py-28">
        <h1 className="text-2xl font-bold">Personalize Your Plan</h1>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr] gap-4 mt-8">
          <div className="p-4 flex flex-col items-center justify-start gap-4">
            <h2 className="text-lg font-semibold">1. Choose Preferences</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {status === 'success' &&
                data &&
                (data.subscription_plan_preferences?.length > 0 ? (
                  data.subscription_plan_preferences.map((item) => (
                    <GridItem
                      key={item.preferences.id}
                      item={item}
                      selectedItems={selectedPreference}
                      setSelectedItems={setSelectedPreference}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-48 w-full">
                    <span className="text-gray-500">No preferences available</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="divider divider-horizontal"></div>

          <div className="p-4 flex flex-col items-center justify-start gap-8">
            <h2 className="text-lg font-semibold">2. Custom Plan Serving</h2>
            <div className="flex justify-between items-center gap-10 w-full">
              <span className="text-sm font-semibold w-full">Number of People</span>
              <ButtonGroup
                options={[2, 4]}
                selectedOption={selectedNumOfPeople}
                setSelectedOption={setSelectedNumOfPeople}
              />
            </div>

            <div className="flex justify-between items-center gap-10 w-full">
              <span className="text-sm font-semibold w-full">Meals Per Week</span>
              <ButtonGroup
                options={[2, 3, 4, 5, 6]}
                selectedOption={selectedMealsPerWeek}
                setSelectedOption={setSelectedMealsPerWeek}
              />
            </div>

            <div className="w-full p-4 border border-gray-200 rounded-md mt-2">
              <h3 className="text-lg font-extrabold px-0 capitalize mb-6">
                {selectedPreference?.name || 'No preference selected'}
              </h3>
              <div className="flex flex-col items-center justify-start gap-4">
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-medium">Number of People</span>
                  <span className="text-sm">{selectedNumOfPeople} People</span>
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-medium">Meals Per Week</span>
                  <span className="text-sm">{selectedMealsPerWeek} Meals</span>
                </div>
              </div>
              <div className="divider divider-vertical"></div>
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-medium">Total Price</span>
                <span className="font-bold text-md">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(data.price_per_serving * selectedNumOfPeople * selectedMealsPerWeek)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 flex flex-col items-center justify-center gap-4 col-span-3 mx-auto">
            <FilledButton
              className="h-14 px-12 w-full"
              onClick={onSubmit}
            >
              Continue
            </FilledButton>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
}

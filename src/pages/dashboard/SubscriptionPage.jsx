import { useToast } from '@/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSubscriptionPlan,
  getPreferences,
  getSubscriptionPlan,
  resetCreateSubscriptionPlanState,
  resetPreferencesState,
  resetSubscriptionPlanState,
  resetUpdateSubscriptionPlanState,
  selectCreateSubscriptionPlan,
  selectPreferences,
  selectSubscriptionPlan,
  selectUpdateSubscriptionPlan,
  updateSubscriptionPlan,
} from '@/slices';
import { LayoutSection } from '@/layouts';
import { Spinner, SubscriptionPlanForm } from '@/components';
import { capitalize } from '@/utils';

export function SubscriptionPage() {
  const { data, message, status } = useSelector(selectSubscriptionPlan);
  const { data: optionPreferences, status: statusPreferences } = useSelector(selectPreferences);
  const { status: statusCreate } = useSelector(selectCreateSubscriptionPlan);
  const { status: statusUpdate } = useSelector(selectUpdateSubscriptionPlan);

  const dispatch = useDispatch();
  const showToast = useToast();

  const options = {
    preferences: optionPreferences?.map((item) => ({ label: capitalize(item.name), value: item.name })),
  };

  const handleCreateSubscriptionPlan = (data) => {
    dispatch(createSubscriptionPlan(data)).then((result) => {
      if (createSubscriptionPlan.fulfilled.match(result)) {
        showToast('Subscription plan created successfully', 'success');
        dispatch(getSubscriptionPlan());
      } else if (createSubscriptionPlan.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  const handleUpdateSubscriptionPlan = (data) => {
    dispatch(updateSubscriptionPlan(data)).then((result) => {
      if (updateSubscriptionPlan.fulfilled.match(result)) {
        showToast('Subscription plan updated successfully', 'success');
        dispatch(getSubscriptionPlan());
      } else if (updateSubscriptionPlan.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  useEffect(() => {
    dispatch(getSubscriptionPlan());
    dispatch(getPreferences());

    return () => {
      dispatch(resetSubscriptionPlanState());
      dispatch(resetPreferencesState());
      dispatch(resetCreateSubscriptionPlanState());
      dispatch(resetUpdateSubscriptionPlanState());
    };
  }, [dispatch]);

  return (
    <LayoutSection>
      <div className="overflow-x-auto w-full shadow-lg border border-gray-200 p-4 rounded-xl lg:min-h-fit bg-gray-50 grid grid-rows-[auto,1fr] gap-4">
        {status === 'success' && statusPreferences === 'success' && data ? (
          <div className="flex flex-col space-y-10 my-4 mx-10">
            <h3 className="text-2xl font-semibold text-center">Update Subscription Plan</h3>
            <SubscriptionPlanForm
              initialData={data}
              options={options}
              onSubmit={handleUpdateSubscriptionPlan}
              status={statusUpdate}
            />
          </div>
        ) : (
          status === 'failed' &&
          message === 'subscriber plan not found!' && (
            <div className="flex flex-col space-y-10 my-4 mx-10">
              <h3 className="text-2xl font-semibold text-center">Create Subscription Plan</h3>
              <SubscriptionPlanForm
                initialData={{}}
                options={options}
                onSubmit={handleCreateSubscriptionPlan}
                status={statusCreate}
              />
            </div>
          )
        )}
        {(status === 'loading' || statusPreferences === 'loading') && (
          <div className="flex items-center justify-center h-96">
            <Spinner />
          </div>
        )}
      </div>
    </LayoutSection>
  );
}

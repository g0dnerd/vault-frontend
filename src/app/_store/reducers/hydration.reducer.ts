import { Action, ActionReducer } from '@ngrx/store';

import * as HydrationActions from '../actions/hydration.actions';
import { State } from '..';

// Type guard to allow safe access to `state` payload
// only if the action type of `hydrateSuccess` matches.
function isHydrateSuccess(
  action: Action,
): action is ReturnType<typeof HydrationActions.hydrateSuccess> {
  return action.type === HydrationActions.hydrateSuccess.type;
}

export const hydrationMetaReducer = (
  reducer: ActionReducer<State>,
): ActionReducer<State> => {
  return (state, action) => {
    if (isHydrateSuccess(action)) {
      return action.state;
    } else {
      return reducer(state, action);
    }
  };
};

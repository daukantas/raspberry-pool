import { createSelector } from 'reselect';

const getRaspberries = (state) => state.raspberries;
const getUser = (state) => state.user;

export const registeredSelector = createSelector(
  [getRaspberries],
  (raspberries) => raspberries.filter(r => r.registered),
);

export const offlineSelector = createSelector(
  [getRaspberries],
  (raspberries) => raspberries.filter(r => r.registered && !r.online),
);

export const unknonwnSelector = createSelector(
  [getRaspberries],
  (raspberries) => raspberries.filter(r => !r.registered),
);

export const ownerOfflineSelector = createSelector(
   [offlineSelector, getUser],
   (raspberries, user) => raspberries.filter(r => r.data.owner === user.id),
);

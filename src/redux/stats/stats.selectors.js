import { createSelector } from 'reselect';

const selectStats = (state) => state.stats;

export const selectAreStatsLoaded = createSelector(
  [selectStats],
  (stats) =>
    !!stats.generalStats &&
    !!stats.confirmed &&
    !!stats.recovered &&
    !!stats.deaths
);

//General Stats
export const selectGeneralStats = createSelector(
  [selectStats],
  (stats) => stats.generalStats
);

//Province Stats

export const selectConfirmedByProvince = createSelector(
  [selectStats],
  (stats) =>
    stats.confirmed
      ? stats.confirmed.map(({ provinceState, confirmed, uid }) => ({
          provinceState,
          value: confirmed,
          uid,
        }))
      : null
);
export const selectDeathsByProvince = createSelector([selectStats], (stats) =>
  stats.deaths
    ? stats.deaths.map(({ provinceState, deaths, uid }) => ({
        provinceState,
        value: deaths,
        uid,
      }))
    : null
);
export const selectRecoveredByProvince = createSelector(
  [selectStats],
  (stats) =>
    stats.recovered
      ? stats.recovered.map(({ provinceState, recovered, uid }) => ({
          provinceState,
          value: recovered,
          uid,
        }))
      : null
);

export const selectSpecificLocationData = createSelector(
  [selectStats],
  (stats) => {
    if (!stats.location) return null;

    const location = stats.location;
    const provincesArray = stats.confirmed;

    return provincesArray.filter(
      (province) => province.provinceState === location
    )[0];
  }
);

export const selectSpecificLocation = createSelector(
  [selectStats],
  (stats) => stats.location
);

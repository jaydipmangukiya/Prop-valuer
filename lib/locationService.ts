import { State, City } from "country-state-city";

export const getStates = () => {
  return State.getStatesOfCountry("IN").map((s: any, index: number) => ({
    id: index + 1,
    isoCode: s.isoCode,
    name: s.name,
  }));
};

export const getCitiesByState = (stateIsoCode: string) => {
  return City.getCitiesOfState("IN", stateIsoCode).map(
    (c: any, index: number) => ({
      id: index + 1,
      name: c.name,
    })
  );
};

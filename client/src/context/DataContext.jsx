import API from "@/lib/API";
import { useAuth } from "@/hooks/useAuth";
import { AuthContext } from "./AuthContext";
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {

  // const { isLogged } = useAuth();
  const { isLogged } = useContext(AuthContext);

  const [bia, setBia] = useState(null);
  const [meal, setMeal] = useState(null);
  const [workout, setWorkout] = useState(null);
  
  useEffect(() => {
    if (!isLogged) {
      resetData();
    }
  }, [isLogged]);
  
  const resetData = () => {
    setBia(null);
    setMeal(null);
    setWorkout(null);
  };

  const fetchData = useCallback(async (type, params = {}) => {
    if (!isLogged) return;
    let data;
    try {
      switch (type) {
        case "bia":
          data = await API.bia();
          setBia(data);
          break;
        case "meal":
          data = await API.meal(params.weekday, params.meal);
          setMeal(data);
          break;
        case "workout":
          data = await API.workout(params.weekday);
          setWorkout(data);
          break;
        default:
          throw new Error("Type must be among bia, meal, workout");
      }
    } catch (error) {
      console.log(`DataContext.fetch${error}`);
    }
  }, []);

  const value = { fetchData, bia, meal, workout, resetData };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { DataContext, DataProvider };
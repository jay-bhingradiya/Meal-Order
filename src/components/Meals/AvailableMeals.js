import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import {useEffect, useState} from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState ([]);

  useEffect (() => {
    fetch ('https://meals-3ca94-default-rtdb.firebaseio.com/meals.json')
      .then (response => {
        return response.json ();
      })
      .then (data => {
        let fetchMeal = [];

        for (let key in data) {
          let obj = {
            id: key,
            ...data[key],
          };
          fetchMeal.push (obj);
        }
        setMeals (fetchMeal);
      });
  }, []);

  const mealsList = meals.map (meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

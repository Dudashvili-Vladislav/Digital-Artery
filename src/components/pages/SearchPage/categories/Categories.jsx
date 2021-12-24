import React from "react";
import { generateCategories } from "../../../../../assets/categories/categories";
import { Card } from "./card/Card";
import classes from "./Categories.module.scss";

export const Categories = () => {
  const categories = generateCategories(12).map(({ title, img }, i) => (
    <Card title={title} img={img} key={i}/>
  ));

  return <div className={classes.categories}>{categories}</div>;
};

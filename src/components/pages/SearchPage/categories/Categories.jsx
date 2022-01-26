import React from "react";
import { NavLink } from "react-router-dom";
import { generateCategories } from "../../../../../assets/categories/categories";
import { Card } from "../../../ui/search/card/Card";
import classes from "@styles/search/categories/Categories.module.scss";

export const Categories = () => {
  const categories = generateCategories(3).map(({ title, img }, i) => (
    <NavLink to={`/category/${i + 1}`} key={i}>
      <Card title={title} img={img} />
    </NavLink>
  ));

  return <div className={classes.categories}>{categories}</div>;
};

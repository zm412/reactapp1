//import logo from "./logo.svg";
import { observer } from "mobx-react";
import { useState, useEffect } from "react";

function Card({ label }) {
  return (
    <div className="card">
      <a href="">{label}</a>
    </div>
  );
}

export default Card;

import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBox(props) {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    document.location = `/search/name/${name}`;
  };
  return (
    <div>
      {props.variant !== "small" ? (
        <form onSubmit={submitHandler} className="searchForm">
          <input
            type="text"
            className="textbox"
            placeholder=" جستجو محصول"
            onChange={(e) => setName(e.target.value)}
          />
          <input title="Search" value="" type="submit" className="button" />
        </form>
      ) : (
        <div className="dropdown">
          <Link to="#search">
            <i className="fas fa-search fa-2x "></i>
          </Link>
          <ul className="dropdown-item">
            <form onSubmit={submitHandler} className="searchForm">
              <input
                type="text"
                className="textbox small"
                placeholder="جستجو محصول"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                title="Search"
                value=""
                type="submit"
                className="button small"
              />
            </form>
          </ul>
        </div>
      )}
    </div>
  );
}

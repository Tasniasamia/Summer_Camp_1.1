"use client"
import React, { useState, useEffect, useRef } from "react";
const SearchInput = ({setGlobalFilter, onSearch, placeholder = "Search by name...", debounceTime = 500, className = "" }) => {


  return (
    <form  className={`flex items-center gap-2 py-2 ${className}`}>
      <input
        type="text"
        onChange={(e) => {setGlobalFilter(e.target.value);}}
        placeholder={placeholder}
        className="px-3 py-2 border w-full rounded-md bg-white border-orange-200 mb-8  focus:outline-none   "
      />
    
     
    </form>
  );
};

export default SearchInput;

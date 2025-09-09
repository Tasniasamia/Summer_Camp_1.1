"use client"
import React, { useState, useEffect, useRef } from "react";
const SearchInput = ({setGlobalFilter, onSearch, placeholder = "Search by name...", debounceTime = 500, className = "" }) => {
  const [value, setValue] = useState("");
  const debRef = useRef(null);

  // call onSearch with debounce
  useEffect(() => {
    if (!onSearch) return;
  if (debRef.current) clearTimeout(debRef.current);
    debRef.current = setTimeout(() => {
      onSearch(value.trim() === "" ? undefined : value.trim());
    }, debounceTime);

    return () => {
      if (debRef.current) clearTimeout(debRef.current);
    };
  }, [value, onSearch, debounceTime]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (debRef.current) clearTimeout(debRef.current);
    onSearch(value.trim() === "" ? undefined : value.trim());
  };

  const handleClear = () => {
    setValue("");
    if (onSearch) onSearch(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex items-center gap-2 py-2 ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => {setValue(e.target.value);setGlobalFilter(e.target.value);}}
        placeholder={placeholder}
        className="px-3 py-2 border rounded-md border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 w-56"
      />
      <button
        type="submit"
        className="px-3 py-2 cursor-pointer text-white h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 border-0 hover:from-yellow-600 hover:to-orange-600 font-semibold"
      >
        Search
      </button>
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="px-2 py-2 border rounded-md text-sm hover:bg-gray-100"
        >
          Clear
        </button>
      )}
    </form>
  );
};

export default SearchInput;

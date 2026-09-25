"use client";

import { useState } from "react";

type Props = {
  onSearch: (term: string) => void;
};

export default function SearchBar({
  onSearch,
}: Props) {
  const [q, setQ] = useState("");

  return (
    <div className="mb-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={q}
          onChange={(e) => {
            const value = e.target.value;
            setQ(value);
            onSearch(value);
          }}
          placeholder="Search medicines..."
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={() => onSearch(q)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          Search
        </button>
      </div>
    </div>
  );
}
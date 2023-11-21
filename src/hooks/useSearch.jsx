"use client";

import { useEffect, useRef, useState } from "react";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const firstInput = useRef(true);

  useEffect(() => {
    if (firstInput.current) {
      firstInput.current = query === "";
      return;
    }

    if (query === "") {
      setError("Escribe una pelicula");
      return;
    }

    if (query.length < 3) {
      setError("Demasiado corta");
      return;
    }

    setError(null);
  }, [query]);
  return { query, setQuery, error };
}

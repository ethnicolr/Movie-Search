import React, { useState, useEffect } from "react";
import error from "./../style/error.png";


interface Props {
  src: string
  size?: string
}

export const Image = ({ src, size = "100%" }: Props) => {
  const [fallback, setFallback] = useState(src);
  const [errored, setError] = useState(false);

  useEffect(() => {
    setFallback(src);
  }, [src]);

  const handleError = () => {
    if (!errored) {
      setError(true);
      setFallback(error);
    }
  };

  const style = {
    width: size,
  };

  return (
    <>
      <img src={fallback} onError={handleError} alt="poster" style={style} />
    </>
  );
};


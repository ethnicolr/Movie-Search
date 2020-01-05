import React, {useState, useEffect} from 'react'
import error from "./../../style/error.png";

const Image = ({src, size}) => {

    const [fallback, setFallback ] = useState(src);
    const [errored, setError] = useState(false);

    useEffect(() => {
        setFallback(src);
    }, [src])

    const handleError = () => {
        if (!errored){
            setError(true);
            setFallback(error);
        }    
    }

    const style = {
        width: size
    }

    return (
        <>
         <img src={fallback} onError={handleError} alt="poster" style={style}/>   
        </>
    )
}

export default Image

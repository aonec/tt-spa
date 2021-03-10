import {EventHandler, RefObject, useCallback, useEffect} from "react";

const useOutsideClick = (ref: RefObject<any>, callback: () => void) => {

    const handleClick = (e: any) => {
        if (!ref.current || ref.current.contains(e.target)) {
            return;
        }
        callback();
    };

    useEffect(() => {
        document.addEventListener("click", handleClick, true);

        return () => {
            document.removeEventListener("click", handleClick, true);
        };
    });
};

export default useOutsideClick;

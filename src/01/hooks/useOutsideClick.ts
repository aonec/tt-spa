import {EventHandler, RefObject, useCallback, useEffect} from "react";

const useOutsideClick = (ref: RefObject<any>, callback: () => void) => {
    debugger;
    const handleClick = (e: any) => {
        if (!ref.current || ref.current.contains(e.target)) {
            return;
        }

                callback();

    };

    const listener = (event: any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
            return;
        }

        callback();
    };

    useEffect(() => {



        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    });
};

export default useOutsideClick;

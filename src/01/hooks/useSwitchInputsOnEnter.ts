import {useEffect} from "react";


export const useSwitchOnInputs = () => {

    const onKeyDown = (e: KeyboardEvent) => {
        const inputList: NodeListOf<HTMLInputElement> = document.querySelectorAll('input:not(:disabled)');

        if (e.key === 'Enter') {

            const activeInput: Element | null = document.activeElement;
            const activeIndex = Array.prototype.indexOf.call(inputList, activeInput);

            if (activeIndex === inputList.length - 1 && activeInput instanceof HTMLInputElement) {
                activeInput.blur();
            }

            if (activeIndex === -1) {
                inputList[0].focus();
                inputList[0].select();
            }

            const nextInput = inputList[activeIndex + 1];
            if (!nextInput) return;
            nextInput.focus();
            nextInput.select();
        }
    };

    useEffect(() => {

        document.addEventListener('keydown', onKeyDown)

        return () => document.removeEventListener('keydown', onKeyDown)

    }, [onKeyDown]);
}


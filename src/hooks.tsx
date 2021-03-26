import React, { useState, useEffect, useRef, LegacyRef, MutableRefObject } from 'react';

export function useComponentVisible(initialIsVisible: boolean) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event: MouseEvent) => {
        const el = ref.current;
        if (el && !(el as Element).contains(event.target as HTMLBaseElement)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
}
import { useEffect } from "react";

// This Hook detects clicks outside of the specified component calls the provided handler function
export default function useOnClickOutside(ref, handler) {
    useEffect(() => {
        // Define the listner function to be called on click/touch event
        const listner = (event) => {
            // If the click touch event originated inside the ref element, do nothhing
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            // Otherwise, call the provided handler function
            handler(event);
        };

        // Add event listner for mousedown and touchstart event on the document
        document.addEventListener('mousedown', listner)
        document.addEventListener('touchstart', listner);

        // Cleanup function to remove the event listner wehn the component unmounts or when the ref/handler dependencies change
        return () => {
            document.removeEventListener("mousedown", listner)
            document.removeEventListener('touchstart', listner)
        };
    }, [ref, handler]) //Only run this effect when the ref or handler function change
}
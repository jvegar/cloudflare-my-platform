import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const useScrollSpy = (sectionIds: string[], offset: number = 100) => {
  const [activeSection, setActiveSection] = useState<string | undefined>(
    undefined
  );
  const location = useLocation();
  const isPlatformRoute = location.pathname.startsWith("/platform");

  useEffect(() => {
    if (isPlatformRoute) {
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Find the current section or return undefined if none found
      const currentSection = sectionIds.find((sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) {
          console.warn(`Section with id "${sectionId}" not found in the DOM`);
          return false;
        }

        const { offsetTop, offsetHeight } = element;
        return (
          scrollPosition >= offsetTop - offset &&
          scrollPosition < offsetTop + offsetHeight - offset
        );
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    // Call once to set initial active section
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset, isPlatformRoute]);

  return isPlatformRoute ? undefined : activeSection;
};

export default useScrollSpy;

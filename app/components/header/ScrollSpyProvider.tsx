import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import useScrollSpy from "./useScrollSpy";
import { ScrollSpyContext } from "./scrollSpyContext";

interface Props {
  children: React.ReactNode;
}

export const ScrollSpyProvider = ({ children }: Props) => {
  const [activeSection, setActiveSection] = useState<string | undefined>(
    undefined
  );
  const location = useLocation();

  const sections =
    location.pathname === "/"
      ? [
          "home-section",
          "about-section",
          "resume-section",
          "services-section",
          "projects-section",
          "contact-section",
        ]
      : [];

  const scrollSpy = useScrollSpy(sections);

  useEffect(() => {
    setActiveSection(scrollSpy);
  }, [scrollSpy]);

  return (
    <ScrollSpyContext.Provider value={{ activeSection }}>
      {children}
    </ScrollSpyContext.Provider>
  );
};

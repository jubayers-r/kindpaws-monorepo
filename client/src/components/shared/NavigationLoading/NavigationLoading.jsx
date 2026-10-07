import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigation } from "react-router";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const SHOW_DELAY_MS = 200;
const RELEASE_DELAY_MS = 150;

const NavigationLoading = () => {
  const navigation = useNavigation();
  const location = useLocation();
  const isNavigating = navigation.state === "loading";
  const [show, setShow] = useState(false);
  const pathRef = useRef(location.pathname);
  const releaseRef = useRef(null);

  // While a route loader is pending, raise the overlay.
  useEffect(() => {
    if (!isNavigating) return;
    clearTimeout(releaseRef.current);
    const timer = setTimeout(() => setShow(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isNavigating]);

  // Navigation finished — release; LoadingScreen holds for its minimum cycle.
  useEffect(() => {
    if (isNavigating) return;
    setShow(false);
  }, [isNavigating]);

  // Instant navigations (no loader) finish before the overlay is raised —
  // raise it on arrival so the paw animation still plays once per navigation.
  useEffect(() => {
    if (pathRef.current === location.pathname) return;
    pathRef.current = location.pathname;
    if (show) return;
    setShow(true);
    releaseRef.current = setTimeout(() => setShow(false), RELEASE_DELAY_MS);
  }, [location.pathname, show]);

  useEffect(() => () => clearTimeout(releaseRef.current), []);

  return <LoadingScreen isLoading={show} />;
};

export default NavigationLoading;

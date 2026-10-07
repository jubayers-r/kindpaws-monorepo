import { useEffect, useState } from "react";
import { useNavigation } from "react-router";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const SHOW_DELAY_MS = 200;

const NavigationLoading = () => {
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";
  const [show, setShow] = useState(false);

  // Raise the overlay only while a route loader is actually fetching.
  // Instant navigations (no data to wait for) never raise it.
  useEffect(() => {
    if (!isNavigating) {
      setShow(false);
      return;
    }
    const timer = setTimeout(() => setShow(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isNavigating]);

  return <LoadingScreen isLoading={show} />;
};

export default NavigationLoading;

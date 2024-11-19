import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { SiteName, SiteSlogan } from "../config";
import { dateFormatterLong, getDaysPassedSinceEpoch } from "../utils/date";

export const Brand = () => {
  const [daysPassedSinceEpoch, setDaysPassedSinceEpoch] = useState(getDaysPassedSinceEpoch(Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      const newDaysPassedSinceEpoch = getDaysPassedSinceEpoch(Date.now());
      if (daysPassedSinceEpoch !== newDaysPassedSinceEpoch) setDaysPassedSinceEpoch(newDaysPassedSinceEpoch);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const { day, month, date, year } = dateFormatterLong();

  return (
    <div className="flex flex-col justify-center items-center">
      <img src={logo} alt={SiteName} />
      <p className="mt-5 mb-2 text-neutral-500 text-sm">{SiteSlogan}</p>
      <p className="text-neutral-500">
        <span className="text-neutral-700 font-medium">{day}</span>, {month} {date}, {year}
      </p>
    </div>
  );
};

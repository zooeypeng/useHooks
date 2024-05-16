Hint #1
Before you worry about asynchronously fetching the battery information, first set and return the initial state of the hook. The state should have the following properties – supported, loading, level, charging, chargingTime, dischargingTime.

import * as React from "react";

export default function useBattery() {
  const [state, setState] = React.useState({
    supported: true,
    loading: true,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null
  });

  return state;
}
Hint #2
Notice that we have a supported property on our state. If the user's device does not support getting their battery information, then you'll want to set supported and loading to false. You can do this by checking if navigator.getBattery is defined.

import * as React from "react";

export default function useBattery() {
  const [state, setState] = React.useState({
    supported: true,
    loading: true,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null
  });

  React.useEffect(() => {
    if (!navigator.getBattery) {
      setState((s) => ({
        ...s,
        supported: false,
        loading: false
      }));

      return;
    }

  }, []);

  return state;
}
Hint #3
In order to get battery information from the user's device, you'll want to use the navigator.getBattery API. getBattery wil return you a promise that resolves to a BatteryManager object. You can then use that BatteryManager object to get the battery information you need.

navigator.getBattery().then((battery) => {
  console.log(battery.level)
  console.log(battery.charging)
  console.log(battery.chargingTime)
  console.log(battery.dischargingTime)
})
You can also use the BatteryManager object to listen for changes to the battery. Specifically, you'll want to listen for the levelchange, chargingchange, chargingtimechange, and dischargingtimechange events.

battery.addEventListener("levelchange", handler);
battery.addEventListener("chargingchange", handler);
battery.addEventListener("chargingtimechange", handler);
battery.addEventListener("dischargingtimechange", handler);
The useBattery hook uses the browser's navigator.getBattery API in order to access and monitor the battery status of the user’s device.

The battery events you'll want to listen for are: levelchange, chargingchange, chargingtimechange, and dischargingtimechange.

const { supported, loading, level, charging, chargingTime, dischargingTime } = useBattery();
For the full documentation, see usehooks.com/usebattery.

TASKS
useBattery should return an object with the following properties – supported, loading, level, charging, chargingTime, dischargingTime
useBattery should set supported and loading to false when navigator.getBattery is not supported
useBattery should update its state with the battery information from the user's device
useBattery should update its state with the battery information from the user's device when the battery information changes
useBattery should remove any event listeners it established when the component using useBattery is removed from the DOM
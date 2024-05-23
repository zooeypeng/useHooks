useNetworkState is a convenient way to get the current network status of the user's device.

It uses the browser's online and offline events as well as navigator.connection's change event under the hood.

const { 
  online,
  downlink,
  downlinkMax,
  effectiveType,
  rtt,
  saveData,
  type,
} = useNetworkState()
For the full documentation, see usehooks.com/usenetworkstate.

TASKS
useNetworkState should return an object with the following properties: online, downlink, downlinkMax, effectiveType, rtt, saveData, and type
useNetworkState should subscribe to the online and offline events on the window object
useNetworkState should subscribe to the change event on the navigator.connection object
useNetworkState should return the current network state when the online or offline events are fired
useNetworkState should clean up its event listeners when the component using useNetworkState is removed from the DOM
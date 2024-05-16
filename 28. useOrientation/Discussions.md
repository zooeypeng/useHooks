Hey everybody :)
7 months ago

it'd be ok to build it using useSyncExternalStore?



👍
1
Avatar for Tyler McGinnis
Tyler McGinnis
7 months ago

Yeah. The reason I didn't use useSyncExternalStore is because useOrientation uses layout information, so I went with useLayoutEffect instead.



❤️
3
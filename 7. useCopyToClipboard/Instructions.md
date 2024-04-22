The useCopyToClipboard hook provides a simple way to copy text to the user's clipboard.

const [copiedText, copyToClipboard] = useCopyToClipboard();

...

copyToClipboard("Text to copy");
For the full documentation, see usehooks.com/usecopytoclipboard.

TASKS
useCopyToClipboard should return an array with the first item being the value that was copied and the second being a function to copy a value to the user's clipboard
The first item in the array that useCopyToClipboard returns should be the value that was copied to the clipboard
The second item in the array that useCopyToClipboard returns should copy a provided value to the user's clipboard
useCopyToClipboard should provide a fallback for the copy functionality for browsers that don't support navigator.writeText
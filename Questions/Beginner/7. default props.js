// How can you set default props for a component?


// React components are just functions, so you can use JavaScript's "default parameters" feature.

function PrimaryButton ({ size = "medium", color = "var(--yellow)" }) {
  ...
}
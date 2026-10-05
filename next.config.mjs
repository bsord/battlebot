// BASE_PATH is set by the GitHub Pages workflow (the site lives at /<repo-name>/).
// Locally it's empty, so the dev server keeps working at the root.
const basePath = process.env.BASE_PATH ?? "";

export default {
  devIndicators: false,
  output: "export",
  basePath,
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

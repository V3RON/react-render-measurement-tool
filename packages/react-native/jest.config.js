export default {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transformIgnorePatterns: ["/node_modules/(?!(@react-native|react-native)/).*/"],
  setupFiles: ["@react-render-measurement-tool/core/setup"],
};

module.exports = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./content/**/*"],
    },
  },
};

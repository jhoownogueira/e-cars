module.exports = {
  apps: [
    {
      name: "e-cars",
      script: "npm",
      args: "run start",
      env: {
        PORT: 3000,
      },
    },
  ],
};

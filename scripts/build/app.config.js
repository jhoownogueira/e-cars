module.exports = {
  apps: [
    {
      name: "project-name",
      script: "npm",
      args: "run start",
      env: {
        PORT: 3000,
      },
    },
  ],
};

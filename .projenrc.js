const { awscdk } = require("projen");
const project = new awscdk.AwsCdkConstructLibrary({
  author: "Harsh Rohila",
  authorAddress: "harsh.rohila@mrisoftware.com",
  cdkVersion: "2.0.0",
  defaultReleaseBranch: "master",
  name: "cdk-codepipeline-ms-teams-notifications",
  repositoryUrl:
    "https://github.com/harsh.rohila/cdk-codepipeline-ms-teams-notifications.git",
  tsconfig: {
    compilerOptions: {
      skipLibCheck: true,
    },
  },

  // cdkDependencies: undefined,      /* Which AWS CDK modules (those that start with "@aws-cdk/") does this library require when consumed? */
  // cdkTestDependencies: undefined,  /* AWS CDK modules required for testing. */
  // deps: [],                        /* Runtime dependencies of this module. */
  // description: undefined,          /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                     /* Build dependencies for this module. */
  // packageName: undefined,          /* The "name" in package.json. */
  // release: undefined,              /* Add release management to this project. */
});
project.synth();

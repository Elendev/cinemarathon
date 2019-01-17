workflow "Build and Deploy" {
  on = "push"
  resolves = ["npm run build"]
}

action "npm install" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  args = "install"
}

action "npm run test" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  runs = "run test"
  needs = ["npm install"]
}

action "npm run build" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  runs = "run build"
  needs = ["npm run test"]
}

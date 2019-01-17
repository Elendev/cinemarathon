workflow "Build and Deploy" {
  on = "push"
  resolves = ["npm build"]
}

action "npm install" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  args = "install"
}

action "npm test" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  runs = "test"
  needs = ["npm install"]
}

action "npm build" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  runs = "build"
  needs = ["npm test"]
}

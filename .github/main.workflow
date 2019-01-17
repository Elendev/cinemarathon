workflow "Build and Deploy" {
  on = "push"
  resolves = ["GitHub Action for npm-2"]
}

action "GitHub Action for npm" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  args = "install"
}

action "GitHub Action for npm-1" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  needs = ["GitHub Action for npm"]
  runs = "test"
}

action "GitHub Action for npm-2" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  needs = ["GitHub Action for npm-1"]
  runs = "build"
}

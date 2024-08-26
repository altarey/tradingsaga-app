## Rules to submit a merge request in Gitlab

### The following links shall help to find respective resources
- [MR page in Gitlab](https://gitlab.com/fantasy-mesa/trading-saga/app/-/merge_requests)
- [List of active issues in Gitlab](https://gitlab.com/fantasy-mesa/trading-saga/app/-/issues)
- [Semantic formatting](https://github.com/semantic-release/semantic-release#commit-message-format)

### Example merge request page 
Title - IssueID: Descriptive title using semantic formatting

Summary 
- What has been changed conceptually
- Make sure it's easy to understand for a junior dev

Include the QA Checklist
- Tested on emu 
  - iOS emu [yes/no]
  - Android emu [yes/no]
- If major feature work, did you test on
  - iOS device [yes/no/na]
  - Android device [yes/no/na]
- Did you attach a screen recording of a new UI feature/component demo?
- Did you notice FPS drop/increase with this change? [yes/no]
  - If answer is yes, include before and after the change screen recordings
- Breaking change with backend/web-site? [yes/no]
- Did you add new unit tests? [yes/no]
- Did you add new telemetry? [yes/no]
- Did you add new story in Storybook? [yes/no]

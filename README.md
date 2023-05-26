# sync-template-repository

## Usage
See [action.yml](action.yml)

Scheduled sync:
```yaml
name: Sync template repository

on:
  schedule:
    # Sync monthly
    - cron: '0 0 1 * *'
permissions:
  contents: write
  pull-requests: write

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: nimiusrd/sync-template-repository@v1
        with:
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          target_repository: 'nimiusrd/sync-template-repository'
          patterns: '*'
```

Manual sync:
```yaml
name: Sync template repository

on:
  workflow_dispatch:
    inputs:
      patterns:
        type: string

permissions:
  contents: write
  pull-requests: write

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: nimiusrd/sync-template-repository@v1
        with:
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          target_repository: 'nimiusrd/sync-template-repository'
          patterns: ${{ inputs.patterns }}
```


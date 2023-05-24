# sync-template-repository

## Usage
See [action.yaml](action.yaml)

Scheduled sync:
```yaml
name: Sync template repositry

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
      - uses: nimiusrd/sync-template-repository
        with:
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          target_repository: 'nimiusrd/sync-template-repository'
          patterns: '*'
```

Manual sync:
```yaml
name: Sync template repositry

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
      - uses: nimiusrd/sync-template-repository
        with:
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          target_repository: 'nimiusrd/sync-template-repository'
          patterns: ${{ inputs.patterns }}
```


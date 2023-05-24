# sync-template-repository

## Usage
See [action.yaml](action.yaml)

Basic:
```yaml
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

# sync-template-repository

## Usage

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
      - uses: besna-institute/sync-template-repository@v1
        with:
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          target_repository: 'besna-institute/sync-template-repository'
          include_patterns: 'src/**'
          exclude_patterns: 'tests/** docs/**'
```

Manual sync:

```yaml
name: Sync template repository

on:
  workflow_dispatch:
    inputs:
      include_patterns:
        type: string
      exclude_patterns:
        type: string

permissions:
  contents: write
  pull-requests: write

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: besna-institute/sync-template-repository@v1
        with:
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          target_repository: 'besna-institute/sync-template-repository'
          include_patterns: ${{ inputs.include_patterns }}
          exclude_patterns: ${{ inputs.exclude_patterns }}
```

### Allow pull requests to be created

> By default, when you create a new repository in your personal account, workflows are not allowed to create or approve pull requests. If you create a new repository in an organization, the setting is inherited from what is configured in the organization settings.
> https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#preventing-github-actions-from-creating-or-approving-pull-requests

You should allow to use the **Allow GitHub Actions to create and approve pull requests** setting:

![image](https://github.com/besna-institute/sync-template-repository/assets/13166203/61a1653c-45b9-47ce-b3ab-fa9cfb2e17d7)


## Inputs

| Name | Description | Default |
| --- | --- | --- |
| `repo_token` | GitHub token | |
| `target_repository` | Target repository | |
| `include_patterns` | Include patterns | `**` |
| `exclude_patterns` | Exclude patterns | |

See [action.yml](action.yml) for more details.

## Publishing a New Release
1. Ensure you are on the main branch and it's up to date with the remote repository.
```bash
git checkout main
```

2. Create a new branch for the release. Replace `x.x.x` with your version number.
```bash
git checkout -b release/vx.x.x
```

3. Replace the version in [package.json](./package.json).

```diff
{
   ...
-  "version": "w.w.w",
+  "version": "x.x.x",
   ...
```

4. Run build script.

```bash
npm run all
```

5. Push the new branch to the remote repository.
```bash
git commit .
git push origin release/vx.x.x
```

6. Create a pull request and make sure all CI passes.

7. Create a new release.

See https://github.com/besna-institute/sync-template-repository/releases/new
Configure as follows and press "Generate release notes".
![image](https://github.com/besna-institute/sync-template-repository/assets/13166203/0433cca6-c982-4874-9d5e-4eb4af9b48b8)

After filling in the release notes, press "Publish release".

8. Merge the pull request into the main branch.

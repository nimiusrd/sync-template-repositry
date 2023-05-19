import * as github from '@actions/github'

interface CreatePullRequestOptions {
  token: string
  targetRepository: string
  branchName: string
  baseBranch: string
  targetBranch: string
}

export const createPullRequest = async ({
  token,
  targetRepository,
  branchName,
  baseBranch,
  targetBranch
}: CreatePullRequestOptions): Promise<void> => {
  const octokit = github.getOctokit(token)
  const response = await octokit.rest.pulls.list({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    head: branchName,
    base: baseBranch
  })
  if (response.data.length > 0) {
    return
  }
  await octokit.rest.pulls.create({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    head: branchName,
    base: baseBranch,
    title: `Sync code with ${targetRepository}`,
    body: `Sync code with [${targetRepository}](https://github.com/${targetRepository}/tree/${targetBranch})`
  })
}

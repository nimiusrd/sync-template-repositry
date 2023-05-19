import * as github from '@actions/github'

interface CreatePullRequestOptions {
  token: string
  targetRepository: string
  branchName: string
  baseBranch: string
}

export const createPullRequest = async ({
  token,
  targetRepository,
  branchName,
  baseBranch
}: CreatePullRequestOptions): Promise<void> => {
  const octokit = github.getOctokit(token)
  await octokit.rest.pulls.create({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    head: branchName,
    base: baseBranch,
    title: `Sync code with ${targetRepository}`,
    body: ``
  })
}

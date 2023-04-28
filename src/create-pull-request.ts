import * as github from '@actions/github'
import * as core from '@actions/core'

export const createPullRequest = async (branch: string): Promise<void> => {
  const myToken = core.getInput('myToken')
  const octokit = github.getOctokit(myToken)
  await octokit.rest.pulls.create({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    head: branch,
    base: github.context.ref,
    title: `Sync template`,
    body: ``
  })
}

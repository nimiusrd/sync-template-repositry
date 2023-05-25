import * as core from '@actions/core'
import {syncTemplate} from './sync-template'
import {createPullRequest} from './create-pull-request'

async function run(): Promise<void> {
  try {
    const token = core.getInput('repo_token')
    const targetRepository = core.getInput('target_repository')
    const targetBranch: string = core.getInput('target_branch') || 'main'
    const branchName: string =
      core.getInput('branch_name') || 'sync-template-repository'
    const baseBranch: string = core.getInput('base_branch') || 'main'
    const patterns: string[] = core.getInput('patterns').split(',') || ['**/*']

    const result = await syncTemplate({
      patterns,
      baseBranch,
      branchName,
      targetRepository,
      targetBranch
    })
    if (result.isNothingToCommit) {
      return
    }
    await createPullRequest({
      token,
      branchName,
      baseBranch,
      targetRepository,
      targetBranch
    })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

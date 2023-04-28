import * as core from '@actions/core'
import {syncTemplate} from './sync-template'
import {createPullRequest} from './create-pull-request'

async function run(): Promise<void> {
  try {
    const targetRepository: string = core.getInput('target_repository')
    const targetBranch: string = core.getInput('target_branch') ?? 'main'
    const branchName: string =
      core.getInput('branch_name') ?? 'sync-template-repository'
    const patterns: string[] = core.getInput('patterns').split(',') ?? ['**/*']

    await syncTemplate({
      patterns,
      branchName,
      targetRepository,
      targetBranch
    })
    await createPullRequest(branchName)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

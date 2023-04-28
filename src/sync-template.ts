import {exec} from '@actions/exec'
import * as glob from '@actions/glob'

interface SyncTemplateOptions {
  patterns: string[]
  branchName: string
  targetRepository: string
  targetBranch: string
}

export const syncTemplate = async ({
  patterns,
  branchName,
  targetRepository,
  targetBranch
}: SyncTemplateOptions): Promise<void> => {
  await exec('git', ['checkout', '-b', branchName])
  await exec('git', ['remote', 'add', 'template', targetRepository])
  await exec('git', ['fetch', 'template'])
  await exec('git', [
    'diff',
    '--output=update.patch',
    branchName,
    `template/${targetBranch}`
  ])
  await exec('git', ['apply', 'update.patch'])
  await exec('rm', ['update.patch'])
  await exec('git', ['config', 'user.name', 'github-actions'])
  await exec('git', ['config', 'user.email', 'github-actions@github.com'])
  const globber = await glob.create(patterns.join('\n'), {
    matchDirectories: false
  })
  const files = await globber.glob()
  await exec('git', ['add', ...files])
  await exec('git', [
    'commit',
    '-m',
    `Sync ${branchName} with ${targetRepository}/${targetBranch}`
  ])
  await exec('git', ['push', '--set-upstream', 'origin', branchName])
  await exec('git', ['checkout', '.'])
}

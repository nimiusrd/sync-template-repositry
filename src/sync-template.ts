import {exec} from '@actions/exec'

interface SyncTemplateOptions {
  patterns: string[]
  baseBranch: string
  branchName: string
  targetRepository: string
  targetBranch: string
}

export const syncTemplate = async ({
  patterns,
  baseBranch,
  branchName,
  targetRepository,
  targetBranch
}: SyncTemplateOptions): Promise<void> => {
  await exec('git', ['fetch', '--all'])
  await exec('git', [
    'checkout',
    '-t',
    '-b',
    baseBranch,
    `origin/${baseBranch}`
  ])
  await exec('git', ['checkout', '-b', branchName])
  await exec('git', ['remote', 'add', 'template', targetRepository])
  await exec('git', ['fetch', '--no-tags', 'template'])
  await exec('git', [
    'diff',
    '--output=update.patch',
    '--full-index',
    branchName,
    `template/${targetBranch}`
  ])
  await exec('git', ['apply', 'update.patch'])
  await exec('rm', ['update.patch'])
  await exec('git', ['config', 'user.name', 'github-actions'])
  await exec('git', ['config', 'user.email', 'github-actions@github.com'])
  await exec('git', ['add', ...patterns.map(pattern => `:(glob)${pattern}`)])
  await exec('git', [
    'commit',
    '-m',
    `Sync code with ${targetRepository}/tree/${targetBranch}`
  ])
  await exec('git', ['push', '-f', '--set-upstream', 'origin', branchName])
  await exec('git', ['checkout', '.'])
}

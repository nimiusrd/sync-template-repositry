import {syncTemplate} from '../src/sync-template'
import {expect, test} from '@jest/globals'

test('syncTemplate', async () => {
  await syncTemplate({
    branchName: 'sync-template-repository',
    targetRepository:
      'https://github.com/nimiusrd/sync-template-repository.git',
    targetBranch: 'test',
    patterns: ['src/**/*']
  })
})

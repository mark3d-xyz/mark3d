import { TokenFullId } from '../types'
import { useCollectionContract } from './useCollectionContract'
import { useStatusState } from '../../hooks'
import { BigNumber, ContractReceipt } from 'ethers'
import { useCallback } from 'react'
import { assertContract, assertSigner } from '../utils/assert'
import { mark3dConfig } from '../../config/mark3d'
import assert from 'assert'
import { nullAddress } from '../utils/id'

export function useDraftTransfer({ collectionAddress, tokenId }: Partial<TokenFullId> = {}) {
  const { contract, signer } = useCollectionContract(collectionAddress)
  const { statuses, wrapPromise } = useStatusState<ContractReceipt>()

  const draftTransfer = useCallback(wrapPromise(async () => {
    assertContract(contract, mark3dConfig.collectionToken.name)
    assertSigner(signer)
    assert(collectionAddress, 'collection address not provided')
    assert(tokenId, 'tokenId is not provided')
    console.log('draft transfer', 'tokenId', tokenId, 'callbackReceiver', nullAddress)
    const res = await contract.draftTransfer(
      BigNumber.from(tokenId),
      nullAddress,
      { gasPrice: mark3dConfig.gasPrice }
    )
    return await res.wait()
  }), [contract, signer, wrapPromise])

  return {
    ...statuses,
    draftTransfer
  }
}

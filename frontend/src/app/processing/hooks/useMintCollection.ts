import { useAccessTokenContract } from './useAccessTokenContract'
import { useCallback } from 'react'
import { nftStorage } from '../../config/nftStorage'
import { randomBytes } from 'ethers/lib/utils'
import { useStatusState } from '../../hooks'
import { BigNumber, ContractReceipt } from 'ethers'
import { mark3dConfig } from '../../config/mark3d'
import { Mark3dAccessTokenEventNames } from '../types'
import { assertContract, assertSigner } from '../utils/assert'
import assert from 'assert'

export interface CreateCollectionForm {
  name?: string // required, hook will return error if omitted
  symbol?: string // required
  description?: string
  image?: File // required
}

interface CreateCollectionResult {
  collectionId: string
  collectionTokenAddress: string
  receipt: ContractReceipt // вся инфа о транзе
}

export function useMintCollection(form: CreateCollectionForm) {
  const { contract, signer } = useAccessTokenContract()
  const { wrapPromise, ...statuses } = useStatusState<CreateCollectionResult>()
  const mintCollection = useCallback(wrapPromise(async () => {
    console.log('mint!', form)
    assertContract(contract, mark3dConfig.accessToken.name)
    assertSigner(signer)
    assert(form.name && form.symbol && form.image, 'CreateCollection form is not filled')
    const metadata = await nftStorage.store({
      name: form.name,
      description: form.description ?? '',
      image: form.image,
      external_link: mark3dConfig.externalLink
    })
    console.log('metadata', metadata)
    const salt = `0x${Buffer.from(randomBytes(32)).toString('hex')}` as const
    const result = await contract.createCollection(salt, form.name, form.symbol, metadata.url, metadata.url, '0x00')
    const receipt = await result.wait()
    const createCollectionEvent = receipt.events
      ?.find(event => event.event === Mark3dAccessTokenEventNames.CollectionCreation)
    if (!createCollectionEvent) {
      throw Error(`receipt does not contain ${Mark3dAccessTokenEventNames.CollectionCreation} event`)
    }
    return {
      collectionId: BigNumber.from(createCollectionEvent.topics[1]).toString(),
      collectionTokenAddress: createCollectionEvent.topics[2],
      receipt
    }
  }), [contract, signer, form, wrapPromise])
  return { ...statuses, mintCollection }
}
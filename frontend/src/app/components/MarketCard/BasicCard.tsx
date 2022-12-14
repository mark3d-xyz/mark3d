import { styled } from '../../../styles'

export const BasicCard = styled('div', {
  maxWidth: '255px',
  height: '320px',
  borderRadius: '$3',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0px 4px 15px rgba(19, 19, 45, 0.1)',
  '&:hover': {
    boxShadow: '0px 12px 25px rgba(19, 19, 45, 0.35)'
  }
})

export const BasicCardSquareImg = styled('img', {
  width: '255px',
  height: '255px',
  borderRadius: 'inherit',
  borderBottomLeftRadius: '0',
  borderBottomRightRadius: '0',
  outline: '1px solid $whiteOp50',
  outlineOffset: '-1px',
  objectFit: 'cover'
})

export const BasicCardControls = styled('div', {
  width: '100%',
  borderRadius: 'inherit',
  borderBottomLeftRadius: '0',
  borderBottomRightRadius: '0',
  backgroundColor: '$white',
  padding: '$3 11px'
})

export default BasicCard

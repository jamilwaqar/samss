import { Platform } from 'react-native'
const tahomaRegular = Platform.OS === 'android' ? 'tahoma-regular':'tahoma'
const tahomaMedium = Platform.OS === 'android' ? 'tahoma-medium':'tahoma'
export enum FamilySet {
  regular = tahomaRegular,
  medium = tahomaMedium,
  mediumItalic = tahomaMedium,
  bold = 'tahoma-bold',
  boldItalic = 'tahoma-bold',
  semibold = 'tahoma-semibold',
}

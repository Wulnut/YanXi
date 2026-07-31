import defaultSettings from '@/settings'

const title = defaultSettings.title || '研 曦 云 上 后 台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

import {
  getCookie
} from '@/assets/utils/getCookie'

export default function({
  redirect
}) {
  if (process.client) {
    if (sessionStorage.getItem('shopCookie') !== null) {
      const token = getCookie(sessionStorage.getItem('shopCookie'))
      if (!token) {
        return redirect('/login')
      }
    }
  }
}

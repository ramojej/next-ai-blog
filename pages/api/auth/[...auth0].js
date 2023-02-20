import { handleAuth, handleCallback, afterCallback } from '@auth0/nextjs-auth0'

const authOptions = {
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback })
    } catch (error) {
      console.log(error)
      const errorMessage = encodeURIComponent(error.message)
      res.redirect(`/reg-error?error=${errorMessage}`)
    }
  },
}

export default handleAuth(authOptions)

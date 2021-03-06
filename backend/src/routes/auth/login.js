import passport from 'passport'
import jwt from 'jsonwebtoken'
import { auth as authConfig } from '../../../config'

export default (app) => {

  app.post('/api/login', passport.authenticate('local-login'), (req, res) => {
    if(req.user) {
      const token = jwt.sign(req.user, authConfig.jwtSecret)
      res.status(200).json({ user: req.user, token })
    } else {
      res.status(401).json({ error: 'Error logging in!' })
    }
  })

}

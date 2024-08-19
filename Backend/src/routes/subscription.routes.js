import {Router} from 'express'
import {subscribeChannel,unSubscribeChannel,isCurrentChannelSubscribed,subscriberCount,subscriptionCount} from '../controllers/subscription.controllers.js'

import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/subscribe-channel/:username").post(verifyJWT,subscribeChannel)
router.route("/unsubscribe-channel/:username").delete(verifyJWT,unSubscribeChannel)
router.route("/is-current-channel-subscribed/:channelId").get(verifyJWT,
       isCurrentChannelSubscribed
) 
router.route("/number-of-subscriber/:userId").get(subscriberCount)
router.route("/number-of-subscription/:userId").get(subscriptionCount)

 
export default router
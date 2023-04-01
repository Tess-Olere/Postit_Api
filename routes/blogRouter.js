const router = require('express').Router();
const { createStory, updateStory, deleteStory, allStories, getAllStories,getaSingleStory, singleStory} = require('../controller/blogController')

// /api/v1/blog
//for user
router.route('/').get(allStories).post(createStory)
router.route('/:blogId').patch(updateStory).delete(deleteStory).get(getaSingleStory)

// no user

router.get('/allblog', getAllStories)
router.get('/all/:blogId', singleStory)



module.exports = router
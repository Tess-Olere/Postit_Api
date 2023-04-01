const router = require('express').Router();
const { getAllStories, singleStory} = require('../controller/blogController')


// no user /api/v1/allblog

router.get('/', getAllStories)
router.get('/:blogId', singleStory)



module.exports = router
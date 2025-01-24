import express from 'express';


import taskCtrl from '../controllers/task.controller.js';


const router = express.Router();

router.route('/tasks')
    .post(
        taskCtrl.create
    )
    .get(
        taskCtrl.list
    )

router.route('/tasks/:taskId')
    .get(
        taskCtrl.retrieve
    )
    .put(
        taskCtrl.update
    )
    .delete(
        taskCtrl.remove
    )



router.param("taskId", taskCtrl.retrieveTaskByID);

export default router;

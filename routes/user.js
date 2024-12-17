import { Router } from 'express';

import {
    handleGetAllUsers, handleGetUserByID, handleUpdateUserById, handleDeleteUserById, handleCreateUser,
}  from '../controllers/user';

const router = Router();

router.route("/")
    .get(handleGetAllUsers)
    .post(handleCreateUser)

router
    .route("/:id")
    .get(handleGetUserByID)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)


export default  router;

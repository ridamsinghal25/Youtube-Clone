import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  deleteVideo,
  getVideoDetails,
  updateVideoDetails,
  updateVideoThumbnail,
  uploadVideo,
} from "../controllersByMe/video.controllerByMe.js";

const router = Router();

router.route("/upload-video/").post(
  verifyJWT,
  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  uploadVideo
);

router.route("/delete-video/:videoId").delete(verifyJWT, deleteVideo);

router.route("/update-video/:videoId").patch(verifyJWT, updateVideoDetails);

router.route("/video-details/:videoId").get(verifyJWT, getVideoDetails);

router
  .route("/update-video-thumbnail/:videoId")
  .patch(verifyJWT, upload.single("thumbnail"), updateVideoThumbnail);

export default router;

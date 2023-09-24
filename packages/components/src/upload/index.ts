import { withInstall } from "@gaddi/utils";
import ImageUpload from "./src/image-upload.vue";
import ImagesUpload from "./src/images-upload.vue";
export * from "./src/type";
export const DImageUpload = withInstall(ImageUpload);
export const DImagesUpload = withInstall(ImagesUpload);

import { withInstall } from "@gaddi/utils";
import ImageUpload from "./src/image-upload.vue";
import ImagesUpload from "./src/images-upload.vue";
export * from "./src/type";

const WImageUpload = withInstall(ImageUpload);
const WImagesUpload = withInstall(ImagesUpload);

export { WImageUpload, WImagesUpload };

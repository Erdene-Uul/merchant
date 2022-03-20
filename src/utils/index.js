const cloudinary = {
    getUrl(url, value) {
        if (url && url.length > 0) {
            const arrUrls = url.split("image/upload")
            return `${arrUrls[0]}image/upload/${value}${arrUrls[1]}`
        } else {
            return "/no-image.png"
        }
    }
}

const Utils = {
    cloudinary
}

export default Utils;

export const uploadToCloudninary = async(pics:any) => {
    const cloud_name ="dvkvr88db"
    const upload_preset ="ecommerce"


    if (pics) {

        const data = new FormData();
        data.append("file",pics);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name" , cloud_name);

        const res = await fetch("https://api.cloudinary.com/v1_1/dvkvr88db/upload" , {
            method:"POST",
            body:data
        })

        const fileData = await res.json();

        return fileData.url;
    }
    else {
        console.log('error : Pics not found');
    }
}
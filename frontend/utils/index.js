import axios from 'axios';

export async function postImage({image, type}) {
  const formData = new FormData();
  formData.append("image", image)
  if(type === 'playlist'){
    const result = await axios.post('http://localhost:4200/playlistImage', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    return result.data
  }else if(type === 'profile'){
    const result = await axios.post('http://localhost:4200/profileImage', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    return result.data
  }
}
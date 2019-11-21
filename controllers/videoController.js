import routes from '../routes'
import Video from '../models/Video'

export const home = async(req, res) => { // to javascript to wait until job finished, we can add keyword async
  try {
    const videos = await Video.find({}); // excute render when video.find finished
    res.render("home", { pageTitle: "Home", videos });
  } catch (err) {
    res.render("home", { pageTitle: "Home", videos: [] });
    console.log(err)
  }
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async(req, res) => {
  const { 
    body: { title, description }, 
    file: { path } 
  } = req;
    const newVideo = await Video.create({
      fileUrl: path, 
      title,
      description
    })
    console.log(newVideo)
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async(req, res) => {
  try {
    const {
      params: {id}
    } = req;
    const video = await Video.findById(id); // Mongoose Model.findById
    res.render("videoDetail", {title: "video Detail", video})
  } catch (err) {
    res.redirect(routes.home)
  }
}

export const getEditVideo = async(req, res) => {
  const {
    params: {id}
  } = req;
  try {
    const video = await Video.findById(id)
    console.log(video)
    res.render("editVideo", {pageTitle: `Edit ${video.title}`, video})
  } catch(error){
    res.redirect(routes.home)
  }
  res.render("editVideo", { pageTitle: "Edit Video" });
}

export const postEditVideo = async(req, res) => {
  const {
    params: {id},
    body: {title, description}
  } = req;
  try {
    await video.findOneAndUpdate({ _id: id}, {title, description})
    res.redirect(routes.videoDetail(id))
  } catch {
    res.redirect(routes.home)
  }
}

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
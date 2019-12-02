import routes from '../routes'
import Video from '../models/Video'

export const home = async(req, res) => { // to javascript to wait until job finished, we can add keyword async
  try {
    const videos = await Video.find({}).sort({_id: -1}); // excute render when video.find finished
    res.render("home", { pageTitle: "Home", videos });
  } catch (err) {
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async(req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: {$regex: searchingBy, $options: "i"}
    }); 
    // regex를 이용함으로써 단어와 정확히 일치하는 결과가 아닌 '포함'하는 결과를 찾음.
    // i(insensitive)를 이용함으로써 대소문자 구분을 하지 않음
  } catch(error) {
  }
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
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async(req, res) => {
  try {
    const {
      params: {id}
    } = req;
    const video = await Video.findById(id); // Mongoose Model.findById
    res.render("videoDetail", {title: video.title, video})
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
    res.render("editVideo", {pageTitle: `Edit ${video.title}`, video})
  } catch(error){
    res.redirect(routes.home)
  }
}

export const postEditVideo = async(req, res) => {
  const {
    params: {id},
    body: {title, description}
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id}, {title, description}) // Models.findOneAndUpdate(엘리먼트를 찾는데 사용할 값, 변경할 값)
    res.redirect(routes.videoDetail(id))
  } catch(error) {
    res.redirect(routes.home)
  }
}

export const deleteVideo = async(req, res) => {
  const {
    params: {id}
  } = req;
  try {
    await Video.findOneAndRemove({_id:id})
  } catch(err) {
  }
  res.redirect(routes.home)
}
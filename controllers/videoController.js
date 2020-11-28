import routes from "../routes";
import Video from "../models/Video";

// Home

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({
      _id: -1
    });
    res.render("home", {
      pageTitle: "Home",
      videos
    });
  } catch (error) {
    console.error(error);
    res.render("home", {
      pageTitle: "Home",
      videos: []
    });
  }
};

// Search

export const search = async (req, res) => {
  const {
    query: {
      term: searchingBy
    }
  } = req;
  let videos = [];
  try {
    // regex를 이용함으로써 단어와 정확히 일치하는 결과가 아닌 '포함'하는 결과를 찾음.
    // i(insensitive)를 이용함으로써 대소문자 구분을 하지 않음
    videos = await Video.find({
      title: {
        $regex: searchingBy,
        $options: "i"
      }
    });
  } catch (error) {
    console.error(error);
  }
  res.render("search", {
    pageTitle: "Search",
    searchingBy,
    videos
  });
};

// Upload

export const getUpload = (req, res) =>
  res.render("upload", {
    pageTitle: "Upload"
  });

export const postUpload = async (req, res) => {
  const {
    body: {
      title,
      description
    },
    file: {
      path
    }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo._id)
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

// Video Detail

// populate(객체를 데려오는 함수는 ObjectId에만 쓰일 수 있음.)
export const videoDetail = async (req, res) => {
  const {
    params: {
      id
    }
  } = req;
  try {
    const video = await Video.findById(id).populate('creator');
    res.render("videoDetail", {
      pageTitle: video.title,
      video
    });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Edit Video

export const getEditVideo = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const video = await Video.findById(id);
    console.log(video.creator._id !== req.user.id)
    if (video.creator._id !== req.user.id) {
      console.log('###video.creator.id : ', video.creator._id, ' req.user.id : ', req.user.id)
      throw Error('User id should be same with creator id');
    } else {
      res.render("editVideo", {
        pageTitle: `Edit ${video.title}`,
        video
      });
    }
  } catch (error) {
    console.log(error)
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: {
      id
    },
    body: {
      title,
      description
    }
  } = req;
  try {
    await Video.findOneAndUpdate({
      _id: id
    }, {
      title,
      description
    });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Delete Video

export const deleteVideo = async (req, res) => {
  const {
    params: {
      id
    }
  } = req;
  try {
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({
        _id: id
      });
    }
  } catch (error) {
    console.error(error);
  }
  res.redirect(routes.home);
};
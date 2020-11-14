import passport from 'passport'
import routes from '../routes'
import User from '../models/User'

export const getJoin = (req, res) => {
  res.render("join", {
    pageTitle: "Join"
  });
}
export const postJoin = async (req, res, next) => {
  const {
    body: {
      name,
      email,
      password,
      password2
    }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", {
      pageTitle: "Join"
    });
  } else {
    try {
      const user = await User({
        name,
        email
      })
      await User.register(user, password);
      next();
    } catch (err) {
      console.error(err)
    }
    // To Do: Log user in
  }
};

export const getLogin = (req, res) =>
  res.render("login", {
    pageTitle: "Log In"
  });

// passport.authentificate()는 username(여기서는 email)과 password를 찾도록 되어있음.
export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home
})

// /auth/github로 접근 시 실행되어, passport.js의 GithubStrategy를 이용한다.
export const githubLogin = passport.authenticate('github');

// cb : 패스포트가 제공하는 함수로, 인증이 성공된 상황에서 호출.
// 패스포트에게 사용자가 성공적으로 로그인되었음을 알릴 것.
// 사용하지 않는 파라미터가 있을때 _로 치환
export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: {
      id,
      avatar_url: avatarUrl,
      name,
      email
    }
  } = profile;
  try {
    const user = await User.findOne({
      email
    })
    // 이미 다른 방법으로 가입한 사용자라면
    // githubId만 user db에 저장한다.
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    // 새로운 사용자라면, 받은 정보로 새로운 사용자를 생성한다.
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl
    })
    return cb(null, newUser);
  } catch {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate('facebook');

export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: {
      id,
      name,
      email
    }
  } = profile;
  try {
    const user = await User.findOne({
      email
    })
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    // 새로운 사용자라면, 받은 정보로 새로운 사용자를 생성한다.
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
    })
    return cb(null, newUser);
  } catch (error) {
    return console(error);
  }
}

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home)
}

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home)
};

// req.user : 현재 로그인 된 사용자
export const getMe = (req, res) => {
  res.render("userDetail", {
    pageTitle: "User Detail",
    user: req.user
  });
}

export const userDetail = async (req, res) => {
  const {
    params: {
      id
    }
  } = req;
  try {
    const user = await User.findById(id).populate('videos');
    res.render("userDetail", {
      pageTitle: "User Detail",
      user
    });
  } catch (error) {
    res.redirect(routes.home)
  }

}
export const getEditProfile = (req, res) =>
  res.render("editProfile", {
    pageTitle: "Edit Profile"
  });

export const postEditProfile = async (req, res) => {
  const {
    body: {
      name,
      email
    },
    file
  } = req;
  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    res.redirect(routes.me)
  } catch (error) {
    res.redirect(routes.editProfile)
  }
}

export const getChangePassword = (req, res) =>
  res.render("changePassword", {
    pageTitle: "Change Password"
  });

export const postChangePassword = async (req, res) => {
  const {
    body: {
      onlyPassword,
      newPassword,
      newPassword1
    }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`)
      return;
    }
    await req.user.changePassword(onlyPassword, newPassword)
    res.redirect(routes.me)
  } catch (err) {
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`)
  }
}
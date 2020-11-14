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

// cb : 패스포트가 제공하는 함수로, 패스포트에게 사용자가 성공적으로 로그인되었음을 알릴 것.
export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
};

export const postGithubLogIn = (req, res) => {
  res.send(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home)
};

export const userDetail = (req, res) =>
  res.render("userDetail", {
    pageTitle: "User Detail"
  });
export const editProfile = (req, res) =>
  res.render("editProfile", {
    pageTitle: "Edit Profile"
  });
export const changePassword = (req, res) =>
  res.render("changePassword", {
    pageTitle: "Change Password"
  });
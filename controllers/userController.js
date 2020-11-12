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
      console.log(err)
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

export const logout = (req, res) => {
  // TODO : process log out
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
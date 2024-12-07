export default class UserInfo {
  constructor({ name, about, avatar}) {
    this._nameElement = document.querySelector(name);
    this._aboutElement = document.querySelector(about);
    this._avatarElement = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo(name, about) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }

  setUserAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}

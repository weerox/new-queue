import { FluxStandardAction } from 'redux-promise-middleware';
import { ActionTypes as UserActions } from '../actions/userActions';
import { ActionTypes as GlobalActions } from '../actions/globalActions';
import User from '../models/User';

const initialState: User | null = null;

export default (state: User | null = initialState, action: FluxStandardAction) => {
  switch (action.type) {

    case UserActions.Login.Fulfilled: {
      const userData = {
        ugkthid: action.payload.data.ugkthid,
        name: action.payload.data.realname,
        username: action.payload.data.username,
        token: action.payload.data.token,
        isAdministrator: action.payload.data.superadmin,
        teacherIn: action.payload.data.teacher_in,
        assistantIn: action.payload.data.assistant_in
      };
      localStorage.setItem('User', JSON.stringify(userData));
      return new User(userData);
    }

    case UserActions.Logout: {
      localStorage.removeItem('User');
      return null;
    }

    case UserActions.LoadUser: {
      const prefix = 'userdata=';
      const cookieData = document.cookie.split(';').map(cookie => cookie.trim()).filter(cookie => cookie.startsWith(prefix))[0];

      if (cookieData) {
        const decodedData = JSON.parse(decodeURIComponent(cookieData.substr(prefix.length)));
        const mappedData = {
          ugkthid: decodedData.ugkthid,
          name: decodedData.realname,
          username: decodedData.username,
          token: decodedData.token,
          isAdministrator: decodedData.superadmin,
          teacherIn: decodedData.teacher_in,
          assistantIn: decodedData.assistant_in
        };
        localStorage.setItem('User', JSON.stringify(mappedData));

        document.cookie = document.cookie.split(';').map(cookie => cookie.trim()).filter(cookie => !cookie.startsWith(prefix)).join('; ');
      }

      const userData = localStorage.getItem('User');
      return userData ? new User(JSON.parse(userData)) : state;
    }

    case GlobalActions.Initialize: {
      const prefix = 'userdata=';
      const cookieData = document.cookie.split(';').map(cookie => cookie.trim()).filter(cookie => cookie.startsWith(prefix))[0];

      if (cookieData) {
        const decodedData = JSON.parse(decodeURIComponent(cookieData.substr(prefix.length)));
        const mappedData = {
          ugkthid: decodedData.ugkthid,
          name: decodedData.realname,
          username: decodedData.username,
          token: decodedData.token,
          isAdministrator: decodedData.superadmin,
          teacherIn: decodedData.teacher_in,
          assistantIn: decodedData.assistant_in
        };
        localStorage.setItem('User', JSON.stringify(mappedData));

        document.cookie = document.cookie.split(';').map(cookie => cookie.trim()).filter(cookie => !cookie.startsWith(prefix)).join('; ');
      }

      const userData = localStorage.getItem('User');
      return userData ? new User(JSON.parse(userData)) : state;
    }

  }

  return state;
};

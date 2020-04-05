use crate::auth::Auth;
use crate::schema::users;
use chrono::{Duration, Utc};
use serde::Serialize;

#[derive(Identifiable, Queryable, Serialize)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub ugkthid: String,
    pub realname: String,
}

#[derive(Serialize)]
pub struct UserAuth<'a> {
    username: &'a str,
    ugkthid: &'a str,
    realname: &'a str,
    token: String,
}

#[derive(Serialize)]
pub struct Profile {
    username: String,
    ugkthid: String,
    realname: String,
}

impl User {
    pub fn to_user_auth(&self, secret: &[u8]) -> UserAuth {
        let exp = Utc::now() + Duration::days(60); // TODO: move to config
        let token = Auth {
            id: self.id,
            username: self.username.clone(),
            ugkthid: self.ugkthid.clone(),
            exp: exp.timestamp(),
        }
        .token(secret);

        UserAuth {
            username: &self.username,
            ugkthid: &self.ugkthid,
            realname: &self.realname,
            token,
        }
    }

    // pub fn to_profile(self, following: bool) -> Profile {
    //     Profile {
    //         username: self.username,
    //         bio: self.bio,
    //         image: self.image,
    //         following,
    //     }
    // }
}

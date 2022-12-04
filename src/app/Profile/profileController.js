const jwtMiddleware = require("../../../config/jwtMiddleware");
const profileProvider = require("../../app/Profile/profileProvider");
const profileService = require("../../app/Profile/profileService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const regexEmail = require("regex-email");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
exports.getTest = async function (req, res) {
  return res.send(response(baseResponse.SUCCESS));
};

/**
 * API no. 1
 * API Name : 프로필 보여주기
 * [GET] /app/profile?id=
 * 쿼리스트링으로 전달시에는 req.query
 */
exports.getProfile = async function (req, res) {
  const userId = req.verifiedToken.userId;
  //   // errResponse 전달
  if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
  // id에 대한 예외처리

  //   // userId를 통한 유저 검색 함수 호출 및 결과 저장
  const userByUserId = await profileProvider.searchUser(userId);
  // 결과를 줄때 result
  return res.send(response(baseResponse.BOOKMARK_SUCCESS));
};

/**
 * API no. 2
 * API Name : 북마크 첫 등록하기
 * [POST] /profile/bookmark?id=
 * 쿼리스트링으로 전달시에는 req.query
 */

exports.postBookmark = async function (req, res) {
  //
  const landid = req.query.id;
  if (!landid) return res.send(errResponse(baseResponse.SIGNUP_LANDID_EMPTY));
  // landid에 대한 예외처리

  const userIdFromJWT = req.verifiedToken.userId;
  // userid를 이렇게 가져오는게 맞는지?

  const bookmarkPostbylandId = await profileService.createBookmark(
    userIdFromJWT,
    landid
  );
  // 결과를 줄때 result
  return res.send(
    response(baseResponse.BOOKMARK_SUCCESS, bookmarkPostbylandId)
  );
};
/**
 * API no. 3
 * API Name : 북마크 설정 및 헤제하기
 * [DELETE] /profile/bookmark?id=
 * 쿼리스트링으로 전달시에는 req.query
 */

exports.deleteBookmark = async function (req, res) {
  const landid = req.query.id;

  if (!landid) return res.send(errResponse(baseResponse.SIGNUP_LANDID_EMPTY));
  // landid에 대한 예외처리

  const userIdFromJWT = req.verifiedToken.userId;
  // userid를 이렇게 가져오는게 맞는지?

  const bookmarkDeletebylandId = await profileService.removeBookmark(
    userIdFromJWT,
    landid
  );
  // 결과를 줄때 result
  return res.send(
    response(baseResponse.BOOKMARKDELETE_SUCCESS, bookmarkDeletebylandId)
  );
};

/**
 * API no. 4
 * API Name : 거래 내역보기
 * [GET] /profile/trade?mode=
 * 쿼리스트링으로 전달시에는 req.query
 */
exports.getTrade = async function (req, res) {
  //
  const userIdFromJWT = req.verifiedToken.userId;

  const mode = parseInt(req.query.mode);

  const TradeGetbyuserId = await profileProvider.searchTrade(
    userIdFromJWT,
    mode
  );
  if (!TradeGetbyuserId) {
    return res.send(response(baseResponse.GETTRADE_EMPTY));
  }

  return res.send(response(baseResponse.GETTRADE_SUCCESS, TradeGetbyuserId));

  // uesrid를 통해 해당 아이디로 거래내역을 조회해서 가져온다.
};

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
// exports.postUsers = async function (req, res) {
//   /**
//    * Body: email, password, nickname
//    */
//   const { email, password, nickname } = req.body;

//   // 빈 값 체크
//   if (!email) return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

//   // 길이 체크
//   if (email.length > 30)
//     return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

//   // 형식 체크 (by 정규표현식)
//   if (!regexEmail.test(email))
//     return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

//   // createUser 함수 실행을 통한 결과 값을 signUpResponse에 저장
//   const signUpResponse = await userService.createUser(
//     email,
//     password,
//     nickname
//   );

//   // signUpResponse 값을 json으로 전달
//   return res.send(signUpResponse);
// };

// /**
//  * API No. 2
//  * API Name : 유저 조회 API (+ 이메일로 검색 조회)
//  * [GET] /app/users
//  */
// exports.getUsers = async function (req, res) {
//   /**
//    * Query String: email
//    */
//   const email = req.query.email;

//   if (!email) {
//     // 유저 전체 조회
//     const userListResult = await userProvider.retrieveUserList();
//     // SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" }, 메세지와 함께 userListResult 호출
//     return res.send(response(baseResponse.SUCCESS, userListResult));
//   } else {
//     // 아메일을 통한 유저 검색 조회
//     const userListByEmail = await userProvider.retrieveUserList(email);
//     return res.send(response(baseResponse.SUCCESS, userListByEmail));
//   }
// };

// /**
//  * API No. 3
//  * API Name : 특정 유저 조회 API
//  * [GET] /app/users/{userId}
//  */
// exports.getUserById = async function (req, res) {
//   /**
//    * Path Variable: userId
//    */
//   const userId = req.params.userId;
//   // errResponse 전달
//   if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

//   // userId를 통한 유저 검색 함수 호출 및 결과 저장
//   const userByUserId = await userProvider.retrieveUser(userId);
//   return res.send(response(baseResponse.SUCCESS, userByUserId));
// };

// // TODO: After 로그인 인증 방법 (JWT)
// /**
//  * API No. 4
//  * API Name : 로그인 API
//  * [POST] /app/login
//  * body : email, passsword
//  */
// exports.login = async function (req, res) {
//   const { email, password } = req.body;

//   const signInResponse = await userService.postSignIn(email, password);

//   return res.send(signInResponse);
// };

// /**
//  * API No. 5
//  * API Name : 회원 정보 수정 API + JWT + Validation
//  * [PATCH] /app/users/:userId
//  * path variable : userId
//  * body : nickname
//  */
// exports.patchUsers = async function (req, res) {
//   // jwt - userId, path variable :userId

//   const userIdFromJWT = req.verifiedToken.userId;

//   const userId = req.params.userId;
//   const nickname = req.body.nickname;

//   // JWT는 이 후 주차에 다룰 내용
//   if (userIdFromJWT != userId) {
//     res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
//   } else {
//     if (!nickname)
//       return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

//     const editUserInfo = await userService.editUser(userId, nickname);
//     return res.send(editUserInfo);
//   }
// };

// JWT 이 후 주차에 다룰 내용
/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
  const userIdResult = req.verifiedToken.userId;
  console.log(userIdResult);
  return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};

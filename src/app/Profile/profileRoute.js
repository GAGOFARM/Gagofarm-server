module.exports = function (app) {
  const profile = require("./profileController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  // 0. 테스트 API
  app.get("/app/test", profile.getTest);

  // 1. 프로필 보여주기 API
  app.get("/app/profile", jwtMiddleware, profile.getProfile);

  // 2. 북마크 첫 등록하기 API
  app.post("/app/profile/bookmark", jwtMiddleware, profile.postBookmark);

  // 3. 북마크 설정 및 헤제하기
  // delete
  app.delete("/app/profile/bookmark", jwtMiddleware, profile.deleteBookmark);

  // 4. 거래내역 보여주기
  app.get("/app/profile/trade", jwtMiddleware, profile.getTrade);

  // 1. 유저 생성 (회원가입) API
  // app.post("/", user.postUsers);

  // 2. 유저 조회 API (+ 검색)
  // app.get("/app/users", user.getUsers);

  // // 3. 특정 유저 조회 API
  // app.get("/app/users/:userId", user.getUserById);

  // // 아래 부분은 7주차에서 다룸.
  // // TODO: After 로그인 인증 방법 (JWT)
  // // 로그인 하기 API (JWT 생성)
  // app.post("/app/login", user.login);

  // // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
  // app.patch("/app/users/:userId", jwtMiddleware, user.patchUsers);
};

// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API
